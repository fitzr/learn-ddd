import 'reflect-metadata'
import { InMemoryUserRepository } from '../../../src/infrastructure/InMemoryUserRepository'
import { UserService } from '../../../src/domain/user/UserService'
import { UserApplicationService } from '../../../src/application/user/UserApplicationService'
import { UserName } from '../../../src/domain/user/UserName'
import { RegisterUserCommand } from '../../../src/application/user/RegisterUserCommand'
import { User } from '../../../src/domain/user/User'
import { MailAddress } from '../../../src/domain/user/MailAddress'
import { UpdateUserCommand } from '../../../src/application/user/UpdateUserCommand'
import { UserId } from '../../../src/domain/user/UserId'

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
        new User(new UserId('test_id'), {
          name: new UserName('test_user'),
          mail: new MailAddress('test@example.com')
        })
      )
      const userData = userApplicationService.get(
        new UpdateUserCommand('test_id')
      )
      expect(userData?.id).toBe('test_id')
      expect(userData?.name).toBe('test_user')
    })

    test('returns undefined when the id dose not exist', () => {
      expect(
        userApplicationService.get(new UpdateUserCommand('BAD_ID'))
      ).toBeUndefined()
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
    test('updates user name and mail address', () => {
      userRepository.save(
        new User(new UserId('test_id'), {
          name: new UserName('test_user'),
          mail: new MailAddress('test@example.com')
        })
      )
      userApplicationService.update(
        new UpdateUserCommand('test_id', 'updated_name', 'updated@example.com')
      )
      const user = userRepository.findById(new UserId('test_id'))
      expect(user?.name.value).toBe('updated_name')
      expect(user?.mail.value).toBe('updated@example.com')
    })

    test('updates user name', () => {
      userRepository.save(
        new User(new UserId('test_id'), {
          name: new UserName('test_user'),
          mail: new MailAddress('test@example.com')
        })
      )
      userApplicationService.update(
        new UpdateUserCommand('test_id', 'updated_name')
      )
      const user = userRepository.findById(new UserId('test_id'))
      expect(user?.name.value).toBe('updated_name')
      expect(user?.mail.value).toBe('test@example.com')
    })

    test('updates mail address', () => {
      userRepository.save(
        new User(new UserId('test_id'), {
          name: new UserName('test_user'),
          mail: new MailAddress('test@example.com')
        })
      )
      userApplicationService.update(
        new UpdateUserCommand('test_id', undefined, 'updated@example.com')
      )
      const user = userRepository.findById(new UserId('test_id'))
      expect(user?.name.value).toBe('test_user')
      expect(user?.mail.value).toBe('updated@example.com')
    })

    test('returns error when name already exists', () => {
      userRepository.save(
        new User(new UserId('test_id'), {
          name: new UserName('test_user'),
          mail: new MailAddress('test@example.com')
        })
      )
      userRepository.save(
        new User(new UserId('test_id2'), {
          name: new UserName('exists_name'),
          mail: new MailAddress('test@example.com')
        })
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
