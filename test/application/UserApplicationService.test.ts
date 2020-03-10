import 'reflect-metadata'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import { UserService } from '../../src/domain/UserService'
import { UserApplicationService } from '../../src/application/UserApplicationService'
import { UserName } from '../../src/domain/UserName'

describe('UserApplicationService', () => {
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)
  const userApplicationService = new UserApplicationService(
    userRepository,
    userService
  )

  afterEach(() => {
    userRepository.store.clear()
  })

  describe('register', () => {
    test('should register user', () => {
      userApplicationService.register('test_user')
      expect(userRepository.store.size).toBe(1)
      expect(userRepository.findByName(new UserName('test_user'))).toBeTruthy()
    })

    test('throws error when the user already exists', () => {
      userApplicationService.register('test_user')
      expect(() => {
        userApplicationService.register('test_user')
      }).toThrowError('User already exists.')
    })
  })

  describe('get', () => {
    test('returns the user data', () => {
      userApplicationService.register('test_user')
      const userData = userApplicationService.get('1')
      expect(userData?.id).toBe('1')
      expect(userData?.name).toBe('test_user')
    })

    test('returns undefined when the id dose not exist', () => {
      expect(userApplicationService.get('BAD_ID')).toBeUndefined()
    })
  })
})
