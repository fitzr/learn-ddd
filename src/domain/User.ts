import { Entity } from './Entity'
import { UserId } from './UserId'

type UserProps = {
  name: string
}

export class User extends Entity<UserId, UserProps> {
  get name(): string {
    return this.props.name
  }

  set name(v: string) {
    User.validateName(v)
    this.props.name = v
  }

  constructor(id: UserId, props: UserProps) {
    User.validateName(props.name)
    super(id, props)
  }

  static validateName(name: string): void {
    if (!/^[a-zA-Z_]{3,15}$/.test(name)) {
      throw new Error(`Username: "${name}" must be [a-zA-Z_]{3,15}`)
    }
  }
}
