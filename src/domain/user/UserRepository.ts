import { User } from './User'
import { UserName } from './UserName'
import { UserId } from './UserId'

export interface UserRepository {
  save(user: User): void
  findById(id: UserId): User | undefined
  findByName(name: UserName): User | undefined
}
