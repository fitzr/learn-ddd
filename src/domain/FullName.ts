import { ValueObject } from './ValueObject'

export type FullNameProps = {
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
    if (!this.isValidateName(firstName)) {
      throw new Error(`First name: "${firstName}" is not valid.`)
    }
    if (!this.isValidateName(lastName)) {
      throw new Error(`Last name: "${lastName}" is not valid.`)
    }
    return new FullName({ firstName, lastName })
  }

  static isValidateName(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name)
  }
}
