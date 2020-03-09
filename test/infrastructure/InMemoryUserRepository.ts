import { v4 as uuid } from 'uuid'
import { UserRepository } from '../../src/domain/UserRepository'
import { User, UserId } from '../../src/domain/User'

export class InMemoryUserRepository implements UserRepository {
  store = new Map<string, User>()

  userOfId(id: UserId): User | undefined {
    const user = this.store.get(id.value)
    return user ? this.clone(user) : undefined
  }

  nextUserId(): UserId {
    return new UserId(uuid())
  }

  save(user: User): void {
    this.store.set(user.id.value, this.clone(user))
  }

  private clone(user: User): User {
    return new User(user.id, Object.assign({}, user.props))
  }
}
