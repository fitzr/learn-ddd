import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { CircleRepository } from './CircleRepository'
import { Circle } from './Circle'

@injectable()
export class CircleService {
  constructor(
    @inject('CircleRepository')
    private readonly circleRepository: CircleRepository
  ) {}

  exists(circle: Circle): boolean {
    return !this.circleRepository.findByName(circle.name)
  }
}
