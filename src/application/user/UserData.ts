import { User } from '../../domain/user/User'
import { UserId } from '../../domain/user/UserId'

export class UserData {
  readonly id: string
  readonly name: string
  readonly mail: string

  constructor(user: User) {
    this.id = (user.id as UserId).value
    this.name = user.name.value
    this.mail = user.mail.value
  }
}
