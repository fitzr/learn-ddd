import 'reflect-metadata'
import { singleton } from 'tsyringe'
import { UserRepository } from '../domain/user/UserRepository'
import { User } from '../domain/user/User'
import { UserName } from '../domain/user/UserName'
import { UserId } from '../domain/user/UserId'

@singleton()
export class InMemoryUserRepository implements UserRepository {
  store = new Map<string, User>()

  findById(id: UserId): User | undefined {
    const user = this.store.get(id.value)
    return user ? this.clone(user) : undefined
  }

  findByName(name: UserName): User | undefined {
    for (const user of this.store.values()) {
      if (user.name.equals(name)) {
        return this.clone(user)
      }
    }
    return undefined
  }

  save(user: User): void {
    if (user.id) {
      this.store.set(user.id.value, this.clone(user))
    } else {
      const id = new UserId((this.store.size + 1).toString(10))
      this.store.set(id.value, new User(user.props, id))
    }
  }

  private clone(user: User): User {
    return new User(Object.assign({}, user.props), user.id)
  }
}
