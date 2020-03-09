import { Entity } from './Entity'
import { UserId } from './UserId'
import { UserName } from './UserName'

type UserProps = {
  name: UserName
}

export class User extends Entity<UserId, UserProps> {
  get name(): UserName {
    return this.props.name
  }

  set name(name: UserName) {
    this.props.name = name
  }

  constructor(id: UserId, props: UserProps) {
    super(id, props)
  }
}
