import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { UserRepository } from '../../domain/user/UserRepository'
import { UserService } from '../../domain/user/UserService'
import { UserName } from '../../domain/user/UserName'
import { User } from '../../domain/user/User'
import { UserId } from '../../domain/user/UserId'
import { UserData } from './UserData'
import { MailAddress } from '../../domain/user/MailAddress'
import { RegisterUserCommand } from './RegisterUserCommand'
import { UpdateUserCommand } from './UpdateUserCommand'
import { GetUserCommand } from './GetUserCommand'

@injectable()
export class UserApplicationService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  get(command: GetUserCommand): UserData | undefined {
    const userId = new UserId(command.id)
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
    }
    if (command.mail) {
      user.mail = new MailAddress(command.mail)
    }
    if (this.userService.exits(user)) {
      throw new Error('User already exists.')
    }
    this.userRepository.save(user)
  }
}