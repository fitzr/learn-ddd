import { ValueObject } from './ValueObject'

type FullNameProps = {
  firstName: string
  lastName: string
}

export class FullName extends ValueObject<FullNameProps> {
  get firstName(): string {
    return this.props.firstName
  }

  get lastName(): string {
    return this.props.lastName
  }

  private constructor(props: FullNameProps) {
    super(props)
  }

  static create(firstName: string, lastName: string): FullName {
    if (!this.isValidName(firstName)) {
      throw new Error(`First name: "${firstName}" is not valid.`)
    }
    if (!this.isValidName(lastName)) {
      throw new Error(`Last name: "${lastName}" is not valid.`)
    }
    return new FullName({ firstName, lastName })
  }

  static isValidName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name)
  }
}
