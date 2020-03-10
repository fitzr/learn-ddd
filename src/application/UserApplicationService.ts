import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { UserRepository } from '../domain/UserRepository'
import { UserService } from '../domain/UserService'
import { UserName } from '../domain/UserName'
import { User } from '../domain/User'
import { UserId } from '../domain/UserId'
import { UserData } from './UserData'

@injectable()
export class UserApplicationService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  register(name: string): void {
    const user = new User({ name: new UserName(name) })
    if (this.userService.exits(user)) {
      throw new Error('User already exists.')
    }
    this.userRepository.save(user)
  }

  get(id: string): UserData | undefined {
    const userId = new UserId(id)
    const user = this.userRepository.findById(userId)
    return user ? new UserData(user) : undefined
  }
}
