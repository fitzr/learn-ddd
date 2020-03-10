import 'reflect-metadata'
import { UserService } from '../../src/domain/UserService'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import { User } from '../../src/domain/User'
import { UserName } from '../../src/domain/UserName'
import { UserId } from '../../src/domain/UserId'
import { MailAddress } from '../../src/domain/MailAddress'

describe('UserService', () => {
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)
  const mail = new MailAddress('test@example.com')

  afterEach(() => {
    userRepository.store.clear()
  })

  describe('exists', () => {
    test('returns true when exists', () => {
      const user1 = new User(
        { name: new UserName('existsName'), mail },
        new UserId('user1')
      )
      userRepository.save(user1)
      const user2 = new User(
        { name: new UserName('existsName'), mail },
        new UserId('user2')
      )
      expect(userService.exits(user2)).toBe(true)
    })

    test('returns false when not exists', () => {
      const user1 = new User(
        { name: new UserName('existsName'), mail },
        new UserId('user1')
      )
      userRepository.save(user1)
      const user2 = new User(
        { name: new UserName('uniqueName'), mail },
        new UserId('user2')
      )
      expect(userService.exits(user2)).toBe(false)
    })
  })
})
