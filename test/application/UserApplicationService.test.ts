import 'reflect-metadata'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import { UserService } from '../../src/domain/UserService'
import { UserApplicationService } from '../../src/application/UserApplicationService'
import { UserName } from '../../src/domain/UserName'
import { RegisterUserCommand } from '../../src/application/RegisterUserCommand'

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
      userApplicationService.register(
        new RegisterUserCommand('test_user', 'test@example.com')
      )
      expect(userRepository.store.size).toBe(1)
      expect(userRepository.findByName(new UserName('test_user'))).toBeTruthy()
    })

    test('throws error when the user already exists', () => {
      userApplicationService.register(
        new RegisterUserCommand('test_user', 'test@example.com')
      )
      expect(() => {
        userApplicationService.register(
          new RegisterUserCommand('test_user', 'test@example.com')
        )
      }).toThrowError('User already exists.')
    })
  })

  describe('get', () => {
    test('returns the user data', () => {
      userApplicationService.register(
        new RegisterUserCommand('test_user', 'test@example.com')
      )
      const userData = userApplicationService.get('1')
      expect(userData?.id).toBe('1')
      expect(userData?.name).toBe('test_user')
    })

    test('returns undefined when the id dose not exist', () => {
      expect(userApplicationService.get('BAD_ID')).toBeUndefined()
    })
  })
})
