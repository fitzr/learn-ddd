import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { User } from './User'
import { UserRepository } from './UserRepository'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  exits(user: User): boolean {
    return !!this.userRepository.findByName(user.name)
  }
}
