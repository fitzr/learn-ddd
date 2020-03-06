import { ValueObject } from './ValueObject'

type IdProps = {
  value: string
}

export abstract class Id extends ValueObject<IdProps> {
  get value(): string {
    return this.props.value
  }

  protected constructor(value: string) {
    super({ value })
  }
}
