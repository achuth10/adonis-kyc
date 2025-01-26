import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersService {
  async allUsers() {
    const users = await User.all()
    return users
  }

  async createUser({ fullName, email, password, type }) {
    // Ideally password would be hashed on front end and then compared here with the same
    // salt and only then stored in the db. For now accepting a PT password
    const user = await User.create({
      fullName,
      email,
      password: await hash.make(password),
      type,
    })
    return this.createTokenForUser(user)
  }

  async loginUser({ email, password }) {
    const user = await User.findBy('email', email)
    if (!user) return 'Invalid creds, check email or passoword'
    const isPasswordValid = await hash.verify(user.password, password)
    if (isPasswordValid) return this.createTokenForUser(user)
    return 'Invalid creds, check email or passoword'
  }

  private async createTokenForUser(user: User) {
    const token = await User.accessTokens.create(user, ['*'], {
      name: 'accessToken',
      expiresIn: '30 days',
    })
    return token
  }
}
