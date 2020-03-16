import 'reflect-metadata'
import { singleton } from 'tsyringe'
import { CircleRepository } from '../../domain/model/circle/CircleRepository'
import { Circle } from '../../domain/model/circle/Circle'
import { CircleId } from '../../domain/model/circle/CircleId'
import { CircleName } from '../../domain/model/circle/CircleName'

// This class should be replaced with a class using some database and be moved to the test directory.

@singleton()
export class InMemoryCircleRepository implements CircleRepository {
  store = new Map<string, Circle>()

  findById(id: CircleId): Circle | undefined {
    const circle = this.store.get(id.value)
    return circle ? this.clone(circle) : undefined
  }

  findByName(name: CircleName): Circle | undefined {
    for (const circle of this.store.values()) {
      if (circle.name.equals(name)) {
        return this.clone(circle)
      }
    }
    return undefined
  }

  save(circle: Circle): void {
    this.store.set(circle.id.value, this.clone(circle))
  }

  nextIdentity(): CircleId {
    return new CircleId((this.store.size + 1).toString())
  }

  private clone(circle: Circle): Circle {
    return new Circle(circle.id, {
      name: new CircleName(circle.name.value),
      owner: circle.owner,
      members: Array.from(circle.members),
      created: new Date()
    })
  }
}
