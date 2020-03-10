import { User } from '../../src/domain/User'
import { UserId } from '../../src/domain/UserId'
import { UserName } from '../../src/domain/UserName'

describe('User', () => {
  test('has name', () => {
    const id = new UserId('testId')
    const name = new UserName('test_user')
    const user = new User({ name }, id)

    expect(user.name.value).toBe('test_user')
  })

  test('can change name', () => {
    const id = new UserId('testId')
    const name = new UserName('test_user')
    const user = new User({ name }, id)
    user.name = new UserName('updated_name')
    expect(user.name.value).toBe('updated_name')
  })

  test('compare by id', () => {
    const id1 = new UserId('testId')
    const sameAsId1 = new UserId('testId')
    const name = new UserName('test_user')
    const id2 = new UserId('testId2')
    const user1 = new User({ name }, id1)
    const sameIdAsUser1 = new User({ name }, sameAsId1)
    const user2 = new User({ name }, id2)

    expect(user1.equals(sameIdAsUser1)).toBe(true)
    expect(user1.equals(user2)).toBe(false)
  })
})
