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

  constructor(props: FullNameProps) {
    super(props)
  }
}
