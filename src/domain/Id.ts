import { ValueObject } from './ValueObject'

type IdProps = {
  value: string
}

export abstract class Id extends ValueObject<IdProps> {
  protected constructor(value: string) {
    Id.validateId(value)
    super({ value })
  }

  get value(): string {
    return this.props.value
  }

  protected static validateId(value: string): void {
    if (!value) {
      throw new Error('Invalid id value.')
    }
  }
}
