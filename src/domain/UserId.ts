import { ValueObject } from './ValueObject'

type UserIdProps = {
  value: string
}

export class UserId extends ValueObject<UserIdProps> {
  get value(): string {
    return this.props.value
  }

  constructor(value: string) {
    super({ value })
  }
}
