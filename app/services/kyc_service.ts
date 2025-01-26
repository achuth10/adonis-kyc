import User from '#models/user'
import Kyc from '#models/kyc'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { KycStatus, exludedFileTypes } from '../constants/Kyc.js'
import db from '@adonisjs/lucid/services/db'

export default class KycService {
  async createKyc({ request, response }: HttpContext) {
    const { email } = request.only(['fullName', 'email'])
    const file = request.file('kyc_file', {
      extnames: exludedFileTypes, // Allowed file extensions
      size: '2mb', // Max file size
    })
    if (!file) {
      return response.badRequest('File is required')
    }
    // Ensure file is valid
    if (!file.isValid) {
      return response.badRequest(file.errors)
    }

    await file.move(app.makePath('storage/uploads'))
    const user = await User.findBy('email', email)
    if (!user) return response.badRequest('Invalid user')

    const kyc = await Kyc.create({
      status: KycStatus.PENDING,
      userId: user.id,
      fileName: file.filePath,
    })

    user.kycId = kyc.id
    await user.save()
  }

  async updateKycStatus({ request, response, auth, params }: HttpContext) {
    const { status } = request.all()
    if (!Object.values(KycStatus).includes(status)) return response.badRequest('Invalid status')
    const { id } = params
    const user = auth.user
    if (user?.type !== 'admin') {
      return response.unauthorized('You do not have the necessary permissions')
    }
    const kyc = await Kyc.find(id)
    if (!kyc) {
      return response.badRequest('Invalid KYC')
    }
    kyc.status = status
    kyc.changedBy = user.id
    kyc.save()
  }

  async getDashboard({ response, auth }: HttpContext) {
    const user = auth.user
    if (user?.type !== 'admin') {
      return response.unauthorized('You do not have the necessary permissions')
    }
    const results = await db.rawQuery(
      'SELECT status, COUNT(*) AS total_count FROM kycs GROUP BY status'
    )
    const totalByStatus = results[0]
    const allUsersCount = await db.rawQuery('SELECT COUNT(*) AS total FROM users')
    return { totalByStatus, allUsersCount: allUsersCount[0] }
  }

  async getAll({ request }: HttpContext) {
    // Should actually be done with a cursor,
    // Due to time contraint use limit/offset
    const { pageSize = '10', pageNumber = '1' } = request.all()
    const parsedSize = Number.parseInt(pageSize)
    const parsedPage = Number.parseInt(pageNumber)
    const offset = (parsedPage - 1) * parsedSize

    const results = await db.rawQuery(`SELECT * FROM kycs LIMIT :size OFFSET :offset`, {
      size: parsedSize,
      offset: offset,
    })
    return results[0]
  }
}
