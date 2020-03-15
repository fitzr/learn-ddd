import { Circle } from './Circle'
import { CircleId } from './CircleId'
import { CircleName } from './CircleName'

export interface CircleRepository {
  save(circle: Circle): void
  findById(id: CircleId): Circle | undefined
  findByName(name: CircleName): Circle | undefined
  nextIdentity(): CircleId
}
