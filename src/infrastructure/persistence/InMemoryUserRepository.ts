import 'reflect-metadata'
import { singleton } from 'tsyringe'
import { UserRepository } from '../../domain/model/user/UserRepository'
import { User } from '../../domain/model/user/User'
import { UserName } from '../../domain/model/user/UserName'
import { UserId } from '../../domain/model/user/UserId'
import { MailAddress } from '../../domain/model/user/MailAddress'

// This class should be replaced with a class using some database and be moved to the test directory.

@singleton()
export class InMemoryUserRepository implements UserRepository {
  store = new Map<string, User>()

  findById(id: UserId): User | undefined {
    const user = this.store.get(id.value)
    return user ? this.clone(user) : undefined
  }

  findAllById(ids: ReadonlyArray<UserId>): User[] {
    return ids
      .map(id => this.findById(id))
      .filter((user): user is User => user != undefined)
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
    this.store.set(user.id.value, this.clone(user))
  }

  nextIdentity(): UserId {
    return new UserId((this.store.size + 1).toString())
  }

  private clone(user: User): User {
    return new User(user.id, {
      name: new UserName(user.name.value),
      mail: new MailAddress(user.mail.value)
    })
  }
}
