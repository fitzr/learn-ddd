import 'reflect-metadata'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import { UserService } from '../../src/domain/UserService'
import { UserApplicationService } from '../../src/application/UserApplicationService'
import { UserName } from '../../src/domain/UserName'
import { RegisterUserCommand } from '../../src/application/RegisterUserCommand'
import { User } from '../../src/domain/User'
import { MailAddress } from '../../src/domain/MailAddress'
import { UpdateUserCommand } from '../../src/application/UpdateUserCommand'
import { UserId } from '../../src/domain/UserId'

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

  describe('get', () => {
    test('returns the user data', () => {
      userRepository.save(
        new User(
          {
            name: new UserName('test_user'),
            mail: new MailAddress('test@example.com')
          },
          new UserId('test_id')
        )
      )
      const userData = userApplicationService.get('test_id')
      expect(userData?.id).toBe('test_id')
      expect(userData?.name).toBe('test_user')
    })

    test('returns undefined when the id dose not exist', () => {
      expect(userApplicationService.get('BAD_ID')).toBeUndefined()
    })
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

  describe('update', () => {
    test('updates user', () => {
      userRepository.save(
        new User(
          {
            name: new UserName('test_user'),
            mail: new MailAddress('test@example.com')
          },
          new UserId('test_id')
        )
      )
      userApplicationService.update(
        new UpdateUserCommand('test_id', 'updated_name', 'updated@example.com')
      )
      const user = userRepository.findById(new UserId('test_id'))
      expect(user?.name.value).toBe('updated_name')
      expect(user?.mail.value).toBe('updated@example.com')
    })

    test('returns error when name already exists', () => {
      userRepository.save(
        new User(
          {
            name: new UserName('test_user'),
            mail: new MailAddress('test@example.com')
          },
          new UserId('test_id')
        )
      )
      userRepository.save(
        new User(
          {
            name: new UserName('exists_name'),
            mail: new MailAddress('test@example.com')
          },
          new UserId('test_id2')
        )
      )
      expect(() => {
        userApplicationService.update(
          new UpdateUserCommand('test_id', 'exists_name')
        )
      }).toThrowError('User already exists.')
    })

    test('return error when user id is not valid', () => {
      expect(() => {
        userApplicationService.update(
          new UpdateUserCommand('test_id', 'exists_name')
        )
      }).toThrowError('User not found.')
    })
  })
})
