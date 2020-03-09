import { User, UserId } from './User'

export interface UserRepository {
  save(user: User): void
  userOfId(id: UserId): User | undefined
  nextUserId(): UserId
}
