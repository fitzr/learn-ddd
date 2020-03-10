import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { User } from './User'
import { UserRepository } from './UserRepository'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  exits(user: User): boolean {
    const sameNameUser = this.userRepository.findByName(user.name)
    return sameNameUser ? !sameNameUser.id?.equals(user.id) : false
  }
}
