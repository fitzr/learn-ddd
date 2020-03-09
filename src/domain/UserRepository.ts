import { User } from './User'
import { UserId } from './UserId'

export interface UserRepository {
  save(user: User): void
  userOfId(id: UserId): User | undefined
  nextUserId(): UserId
}
