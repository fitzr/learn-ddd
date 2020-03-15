import { Entity } from '../Entity'
import { CircleName } from './CircleName'
import { CircleId } from './CircleId'

export type CircleProps = {
  name: CircleName
}

export class Circle extends Entity<CircleId, CircleProps> {
  constructor(id: CircleId, props: CircleProps) {
    super(id, props)
  }

  get name(): CircleName {
    return this.props.name
  }

  changeName(name: CircleName): void {
    this.props.name = name
  }
}
