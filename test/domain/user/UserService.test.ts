import 'reflect-metadata'
import { UserService } from '../../../src/domain/user/UserService'
import { InMemoryUserRepository } from '../../../src/infrastructure/InMemoryUserRepository'
import { User } from '../../../src/domain/user/User'
import { UserName } from '../../../src/domain/user/UserName'
import { UserId } from '../../../src/domain/user/UserId'
import { MailAddress } from '../../../src/domain/user/MailAddress'

describe('UserService', () => {
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)
  const mail = new MailAddress('test@example.com')

  afterEach(() => {
    userRepository.store.clear()
  })

  describe('exists', () => {
    test('returns true when exists', () => {
      const user1 = new User(new UserId('user1'), {
        name: new UserName('existsName'),
        mail
      })
      userRepository.save(user1)
      const user2 = new User(new UserId('user2'), {
        name: new UserName('existsName'),
        mail
      })
      expect(userService.exists(user2)).toBe(true)
    })

    test('returns false when not exists', () => {
      const user1 = new User(new UserId('user1'), {
        name: new UserName('existsName'),
        mail
      })
      userRepository.save(user1)
      const user2 = new User(new UserId('user2'), {
        name: new UserName('uniqueName'),
        mail
      })
      expect(userService.exists(user2)).toBe(false)
    })
  })
})
