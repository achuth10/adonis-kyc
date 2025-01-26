// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import UsersService from '#services/users_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Return list of all posts or paginate through
   * them
   */
  async index({}: HttpContext) {
    return this.usersService.allUsers()
  }
  /**
   * Handle form submission to create a new user
   */
  async register({ request }: HttpContext) {
    return this.usersService.createUser(request.body())
  }

  /**
   * Display a single post by id.
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params }: HttpContext) {}

  async issueToken({ params }: HttpContext) {
    {
      const user = await User.findOrFail(params.id)
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'accessToken',
        expiresIn: '30 days',
      })
      return token
    }
  }

  async login({ request }: HttpContext) {
    return this.usersService.loginUser(request.body())
  }
}
