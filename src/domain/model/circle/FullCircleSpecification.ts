import { CircleMembers } from './CircleMembers'
import { Specification } from '../Specification'

export class FullCircleSpecification implements Specification<CircleMembers> {
  isSatisfiedBy(members: CircleMembers): boolean {
    const userUpperLimit = members.getPremiumMemberCount() < 10 ? 30 : 50
    return members.length >= userUpperLimit
  }
}
