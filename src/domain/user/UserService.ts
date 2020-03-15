import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { User } from './User'
import { UserRepository } from './UserRepository'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  exists(user: User): boolean {
    return !!this.userRepository.findByName(user.name)
  }
}
