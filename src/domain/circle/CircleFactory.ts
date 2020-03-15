import { CircleName } from './CircleName'
import { User } from '../user/User'
import { Circle } from './Circle'

export interface CircleFactory {
  create(name: CircleName, owner: User): Circle
}
