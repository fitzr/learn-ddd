import 'reflect-metadata'
import { UserService } from '../../src/domain/UserService'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import { User, UserId } from '../../src/domain/User'

describe('UserService', () => {
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)

  afterEach(() => {
    userRepository.store.clear()
  })

  describe('exists', () => {
    test('returns true when exists', () => {
      const user = new User(new UserId('testUserId'), { name: 'testUserName' })
      userRepository.save(user)
      expect(userService.exits(user)).toBe(true)
    })

    test('returns false when not exists', () => {
      const user = new User(new UserId('testUserId'), { name: 'testUserName' })
      expect(userService.exits(user)).toBe(false)
    })
  })
})
