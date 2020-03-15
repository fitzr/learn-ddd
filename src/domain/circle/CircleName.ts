import { ValueObject } from '../ValueObject'

export type CircleNameProps = {
  value: string
}

export class CircleName extends ValueObject<CircleNameProps> {
  constructor(name: string) {
    CircleName.validateName(name)
    super({ value: name })
  }

  get value(): string {
    return this.props.value
  }

  static validateName(name: string): void {
    if (!/^[a-zA-Z_]{3,20}$/.test(name)) {
      throw new Error(`CircleName: "${name}" must be [a-zA-Z_]{3,20}`)
    }
  }
}
