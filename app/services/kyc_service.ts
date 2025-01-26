import User from '#models/user'
import Kyc from '#models/kyc'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class KycService {
  async createKyc({ request, response }: HttpContext) {
    const { fullName, email } = request.only(['fullName', 'email'])
    const file = request.file('kyc_file', {
      extnames: ['png', 'jpg', 'jpeg', 'pdf', 'txt'], // Allowed file extensions
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
      status: 'pending',
      userId: user.id,
      fileName: file.filePath,
    })

    user.kycId = kyc.id
    await user.save()
  }
}
