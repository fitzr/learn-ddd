import { InMemoryUserRepository } from '../../../../src/infrastructure/persistence/InMemoryUserRepository'
import { InMemoryCircleRepository } from '../../../../src/infrastructure/persistence/InMemoryCircleRepository'
import { User } from '../../../../src/domain/model/user/User'
import { UserId } from '../../../../src/domain/model/user/UserId'
import { UserName } from '../../../../src/domain/model/user/UserName'
import { MailAddress } from '../../../../src/domain/model/user/MailAddress'
import { Circle } from '../../../../src/domain/model/circle/Circle'
import { CircleName } from '../../../../src/domain/model/circle/CircleName'
import { CircleId } from '../../../../src/domain/model/circle/CircleId'
import { CircleService } from '../../../../src/domain/model/circle/CircleService'

describe('CircleService', () => {
  const createUser = (i: number): User =>
    new User(new UserId(`id_${i}`), {
      name: new UserName(`name_${i}`),
      mail: new MailAddress('test@example.com')
    })

  const userRepository = new InMemoryUserRepository()
  const circleRepository = new InMemoryCircleRepository()
  const circleService = new CircleService(circleRepository, userRepository)
  const users = [...Array(50)].map((_, i) => createUser(i))

  beforeAll(() => {
    users.forEach(user => userRepository.save(user))
  })

  afterEach(() => {
    circleRepository.store.clear()
  })

  describe('exists', () => {
    test('returns true when exists', () => {
      const circle1 = new Circle(new CircleId('circle1'), {
        name: new CircleName('existsName'),
        owner: users[0].id,
        members: [users[1].id],
        created: new Date()
      })
      circleRepository.save(circle1)
      const circle2 = new Circle(new CircleId('circle2'), {
        name: new CircleName('existsName'),
        owner: users[2].id,
        members: [users[3].id],
        created: new Date()
      })
      expect(circleService.exists(circle2)).toBe(true)
    })

    test('returns false when not exists', () => {
      const circle1 = new Circle(new CircleId('circle1'), {
        name: new CircleName('existsName'),
        owner: users[0].id,
        members: [users[1].id],
        created: new Date()
      })
      circleRepository.save(circle1)
      const circle2 = new Circle(new CircleId('circle2'), {
        name: new CircleName('uniqueName'),
        owner: users[2].id,
        members: [users[3].id],
        created: new Date()
      })
      expect(circleService.exists(circle2)).toBe(false)
    })
  })

  describe('addMember', () => {
    test('adds member', () => {
      const circle = new Circle(new CircleId('id'), {
        name: new CircleName('test_circle'),
        owner: users[0].id,
        members: [],
        created: new Date()
      })
      expect(circle.members.length).toBe(0)
      circleService.addMember(circle, users[1])
      expect(circle.members.length).toBe(1)
    })

    test('throws error when the circle is full', () => {
      const circle = new Circle(new CircleId('id'), {
        name: new CircleName('test_circle'),
        owner: users[0].id,
        members: users.slice(1, 31).map(user => user.id),
        created: new Date()
      })
      expect(circle.members.length).toBe(30)
      expect(() => {
        circleService.addMember(circle, users[31])
      }).toThrowError('The circle is full.')
    })
  })
})
