import { User } from '../user/User'

export class CircleMembers {
  constructor(readonly owner: User, readonly members: ReadonlyArray<User>) {}

  get length(): number {
    return this.members.length + 1 // +1: for the count of owner
  }

  getPremiumMemberCount(containsOwner = true): number {
    const premiumMemberNum = this.members.filter(member => member.isPremium)
      .length
    return premiumMemberNum + (containsOwner && this.owner.isPremium ? 1 : 0)
  }
}
