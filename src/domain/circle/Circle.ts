import { Entity } from '../Entity'
import { CircleName } from './CircleName'
import { CircleId } from './CircleId'
import { UserId } from '../user/UserId'

export type CircleProps = {
  name: CircleName
  owner: UserId
  members: UserId[]
  created: Date
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

  get owner(): UserId {
    return this.props.owner
  }

  get created(): Date {
    return this.props.created
  }

  get members(): ReadonlyArray<UserId> {
    return Object.freeze([...this.props.members])
  }

  get memberCount(): number {
    return this.props.members.length + 1 // +1: count for the owner
  }

  // HACK: This method must be package private. Only for CircleService
  addMember(userId: UserId): void {
    this.props.members.push(userId)
  }
}
