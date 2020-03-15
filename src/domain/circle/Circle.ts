import { Entity } from '../Entity'
import { CircleName } from './CircleName'
import { CircleId } from './CircleId'
import { User } from '../user/User'
import { UserId } from '../user/UserId'

export type CircleProps = {
  name: CircleName
  members: UserId[]
}

export class Circle extends Entity<CircleId, CircleProps> {
  static MEMBER_MAX_COUNT = 30

  constructor(id: CircleId, props: CircleProps) {
    super(id, props)
  }

  get name(): CircleName {
    return this.props.name
  }

  changeName(name: CircleName): void {
    this.props.name = name
  }

  get members(): ReadonlyArray<UserId> {
    return Object.freeze(this.props.members)
  }

  get memberCount(): number {
    return this.props.members.length + 1 // +1: for the count of owner
  }

  isFull(): boolean {
    return this.memberCount >= Circle.MEMBER_MAX_COUNT
  }

  join(user: User): void {
    if (this.isFull()) {
      throw new Error(`Circle: ${this.name.value} is full.`)
    }
    this.props.members.push(user.id)
  }
}
