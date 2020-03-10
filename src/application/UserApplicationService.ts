import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { UserRepository } from '../domain/UserRepository'
import { UserService } from '../domain/UserService'
import { UserName } from '../domain/UserName'
import { User } from '../domain/User'
import { UserId } from '../domain/UserId'
import { UserData } from './UserData'
import { MailAddress } from '../domain/MailAddress'
import { RegisterUserCommand } from './RegisterUserCommand'
import { UpdateUserCommand } from './UpdateUserCommand'

@injectable()
export class UserApplicationService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  get(id: string): UserData | undefined {
    const userId = new UserId(id)
    const user = this.userRepository.findById(userId)
    return user ? new UserData(user) : undefined
  }

  register(command: RegisterUserCommand): void {
    const user = new User({
      name: new UserName(command.name),
      mail: new MailAddress(command.mail)
    })
    if (this.userService.exits(user)) {
      throw new Error('User already exists.')
    }
    this.userRepository.save(user)
  }

  update(command: UpdateUserCommand): void {
    const id = new UserId(command.id)
    const user = this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found.')
    }
    if (command.name) {
      user.name = new UserName(command.name)
      if (this.userService.exits(user)) {
        throw new Error('User already exists.')
      }
    }
    if (command.mail) {
      user.mail = new MailAddress(command.mail)
    }
    this.userRepository.save(user)
  }
}
