import { ValueObject } from './ValueObject'

type UserNameProps = {
  value: string
}

export class UserName extends ValueObject<UserNameProps> {
  constructor(name: string) {
    UserName.validateName(name)
    super({ value: name })
  }

  get value(): string {
    return this.props.value
  }

  static validateName(name: string): void {
    if (!/^[a-zA-Z_]{3,15}$/.test(name)) {
      throw new Error(`Username: "${name}" must be [a-zA-Z_]{3,15}`)
    }
  }
}
