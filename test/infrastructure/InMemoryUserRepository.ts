import { v4 as uuid } from 'uuid'
import { UserRepository } from '../../src/domain/UserRepository'
import { User } from '../../src/domain/User'
import { UserName } from '../../src/domain/UserName'
import { UserId } from '../../src/domain/UserId'

export class InMemoryUserRepository implements UserRepository {
  store = new Map<string, User>()

  findByName(name: UserName): User | undefined {
    const user = this.store.get(name.value)
    return user ? this.clone(user) : undefined
  }

  nextUserId(): UserId {
    return new UserId(uuid())
  }

  save(user: User): void {
    this.store.set(user.name.value, this.clone(user))
  }

  private clone(user: User): User {
    return new User(user.id, Object.assign({}, user.props))
  }
}
