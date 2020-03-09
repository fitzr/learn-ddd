import { User } from './User'
import { UserId } from './UserId'
import { UserName } from './UserName'

export interface UserRepository {
  save(user: User): void
  findByName(name: UserName): User | undefined
  nextUserId(): UserId
}
