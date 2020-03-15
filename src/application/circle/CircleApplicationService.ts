import { injectable, inject } from 'tsyringe'
import { CircleFactory } from '../../domain/circle/CircleFactory'
import { CircleRepository } from '../../domain/circle/CircleRepository'
import { CircleService } from '../../domain/circle/CircleService'
import { CreateCircleCommand } from './CreateCircleCommand'
import { UserId } from '../../domain/user/UserId'
import { UserRepository } from '../../domain/user/UserRepository'
import { CircleName } from '../../domain/circle/CircleName'

@injectable()
export class CircleApplicationService {
  constructor(
    @inject('CircleFactory') private readonly circleFactory: CircleFactory,
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
    const circle = this.circleFactory.create(name, owner)
    if (this.circleService.exists(circle)) {
      throw new Error('Requested circle already exists.')
    }

    this.circleRepository.save(circle)
  }
}
