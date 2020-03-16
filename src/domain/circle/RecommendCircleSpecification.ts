import { Specification } from '../Specification'
import { Circle } from './Circle'

export class RecommendCircleSpecification implements Specification<Circle> {
  constructor(private readonly date: Date) {}

  isSatisfiedBy(circle: Circle): boolean {
    return (
      circle.memberCount > 10 &&
      circle.created.getTime() > this.date.getTime() - 2592000000 // in 30 days
    )
  }
}
