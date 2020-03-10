import { User } from '../domain/User'
import { UserId } from '../domain/UserId'

export class UserData {
  readonly id: string
  readonly name: string

  constructor(user: User) {
    this.id = (user.id as UserId).value
    this.name = user.name.value
  }
}
