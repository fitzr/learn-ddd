import { CircleMembers } from './CircleMembers'

export class CircleFullSpecification {
  isFull(members: CircleMembers): boolean {
    const userUpperLimit = members.getPremiumMemberCount() < 10 ? 30 : 50
    return members.length >= userUpperLimit
  }
}
