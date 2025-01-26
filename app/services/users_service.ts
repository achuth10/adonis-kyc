import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersService {
  allUsers() {
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romsain',
      },
    ]
  }

  async createUser({ fullName, email, password }) {
    const user = await User.create({
      fullName,
      email,
      password: await hash.make(password),
    })
  }
}
