import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { UserRepository } from '../../domain/model/user/UserRepository'
import { UserService } from '../../domain/model/user/UserService'
import { UserName } from '../../domain/model/user/UserName'
import { User } from '../../domain/model/user/User'
import { UserId } from '../../domain/model/user/UserId'
import { UserData } from './UserData'
import { MailAddress } from '../../domain/model/user/MailAddress'
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
    const user = new User(this.userRepository.nextIdentity(), {
      name: new UserName(command.name),
      mail: new MailAddress(command.mail)
    })
    if (this.userService.exists(user)) {
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
      user.changeName(new UserName(command.name))
      if (this.userService.exists(user)) {
        throw new Error('User already exists.')
      }
    }
    if (command.mail) {
      user.changeMail(new MailAddress(command.mail))
    }
    this.userRepository.save(user)
  }
}
