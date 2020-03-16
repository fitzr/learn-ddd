import { injectable, inject } from 'tsyringe'
import { CircleRepository } from '../../domain/model/circle/CircleRepository'
import { CircleService } from '../../domain/model/circle/CircleService'
import { CreateCircleCommand } from './CreateCircleCommand'
import { UserId } from '../../domain/model/user/UserId'
import { UserRepository } from '../../domain/model/user/UserRepository'
import { CircleName } from '../../domain/model/circle/CircleName'
import { JoinCircleCommand } from './JoinCircleCommand'
import { CircleId } from '../../domain/model/circle/CircleId'
import { Circle } from '../../domain/model/circle/Circle'

@injectable()
export class CircleApplicationService {
  constructor(
    @inject('CircleRepository')
    private readonly circleRepository: CircleRepository,
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly circleService: CircleService
  ) {}

  // @transactional
  create(command: CreateCircleCommand): void {
    const ownerId = new UserId(command.userId)
    const owner = this.userRepository.findById(ownerId)
    if (!owner) {
      throw new Error('Requested owner is not found.')
    }

    const name = new CircleName(command.name)
    const circle = new Circle(this.circleRepository.nextIdentity(), {
      name,
      owner: owner.id,
      members: [],
      created: new Date()
    })
    if (this.circleService.exists(circle)) {
      throw new Error('Requested circle already exists.')
    }

    this.circleRepository.save(circle)
  }

  // @transactional
  join(command: JoinCircleCommand): void {
    const circleId = new CircleId(command.circleId)
    const circle = this.circleRepository.findById(circleId)
    if (!circle) {
      throw new Error('Requested circle is not found.')
    }
    const userId = new UserId(command.userId)
    const user = this.userRepository.findById(userId)
    if (!user) {
      throw new Error('Requested user is not found.')
    }
    this.circleService.addMember(circle, user)
    this.circleRepository.save(circle)
  }
}
