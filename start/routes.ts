/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')

router.resource('users', UsersController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Temp route to issue tokens, not for actual use
router.post('users/:id/tokens', [UsersController, 'issueToken'])
