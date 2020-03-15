import { User } from './User'
import { UserName } from './UserName'
import { UserId } from './UserId'

export interface UserRepository {
  save(user: User): void
  findById(id: UserId): User | undefined
  findAllById(ids: ReadonlyArray<UserId>): User[]
  findByName(name: UserName): User | undefined
  nextIdentity(): UserId
}
