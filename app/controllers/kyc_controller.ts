import KycService from '#services/kyc_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class KycController {
  constructor(private readonly kycService: KycService) {}

  async index({}: HttpContext) {}
  async store(context: HttpContext) {
    return this.kycService.createKyc(context)
  }
  async show({ params }: HttpContext) {}
  async update({ params, request }: HttpContext) {}
  async destroy({ params }: HttpContext) {}
}
