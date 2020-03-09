import { User, UserId } from '../../src/domain/User'

describe('User', () => {
  test('has name', () => {
    const id = new UserId('testId')
    const user = new User(id, { name: 'test_user' })

    expect(user.name).toBe('test_user')
  })

  test('cannot set invalid name', () => {
    const id = new UserId('testId')
    expect(() => {
      new User(id, { name: 'test-user' })
    }).toThrowError()
  })

  test('can change name', () => {
    const id = new UserId('testId')
    const user = new User(id, { name: 'test_user' })
    user.name = 'updated_name'
    expect(user.name).toBe('updated_name')
  })

  test('compare by id', () => {
    const id1 = new UserId('testId')
    const sameAsId1 = new UserId('testId')
    const id2 = new UserId('testId2')
    const user1 = new User(id1, { name: 'test' })
    const sameIdAsUser1 = new User(sameAsId1, { name: 'test' })
    const user2 = new User(id2, { name: 'test' })

    expect(user1.equals(sameIdAsUser1)).toBe(true)
    expect(user1.equals(user2)).toBe(false)
  })
})
