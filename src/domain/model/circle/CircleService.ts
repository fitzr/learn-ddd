import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { CircleRepository } from './CircleRepository'
import { Circle } from './Circle'
import { User } from '../user/User'
import { FullCircleSpecification } from './FullCircleSpecification'
import { CircleMembers } from './CircleMembers'
import { UserRepository } from '../user/UserRepository'

@injectable()
export class CircleService {
  constructor(
    @inject('CircleRepository')
    private readonly circleRepository: CircleRepository,
    @inject('UserRepository')
    private readonly userRepository: UserRepository
  ) {}

  exists(circle: Circle): boolean {
    return !!this.circleRepository.findByName(circle.name)
  }

  addMember(circle: Circle, user: User): void {
    const owner = this.userRepository.findById(circle.owner)
    if (!owner) {
      throw new Error('Invalid owner Id.') // fail safe
    }
    const members = this.userRepository.findAllById(circle.members)
    const circleMembers = new CircleMembers(owner, members)
    const circleFullSpecification = new FullCircleSpecification()
    if (circleFullSpecification.isSatisfiedBy(circleMembers)) {
      throw new Error('The circle is full.')
    }
    circle.addMember(user.id)
  }
}
