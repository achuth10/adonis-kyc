import KycService from '#services/kyc_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class KycController {
  constructor(private readonly kycService: KycService) {}

  async dashboard(context: HttpContext) {
    return this.kycService.getDashboard(context)
  }
  async store(context: HttpContext) {
    return this.kycService.createKyc(context)
  }
  async index(context: HttpContext) {
    return this.kycService.getAll(context)
  }
  async update({ params, request }: HttpContext) {}
  async destroy({ params }: HttpContext) {}

  async updateKycStatus(context: HttpContext) {
    return this.kycService.updateKycStatus(context)
  }
}
