import { User } from '../../../src/domain/user/User'
import { UserId } from '../../../src/domain/user/UserId'
import { UserName } from '../../../src/domain/user/UserName'
import { MailAddress } from '../../../src/domain/user/MailAddress'

describe('User', () => {
  test('has name', () => {
    const id = new UserId('testId')
    const name = new UserName('test_user')
    const mail = new MailAddress('test@example.com')
    const user = new User(id, { name, mail })

    expect(user.name.value).toBe('test_user')
  })

  test('can change name', () => {
    const id = new UserId('testId')
    const name = new UserName('test_user')
    const mail = new MailAddress('test@example.com')
    const user = new User(id, { name, mail })
    user.changeName(new UserName('updated_name'))
    expect(user.name.value).toBe('updated_name')
  })

  test('compare by id', () => {
    const id1 = new UserId('testId')
    const sameAsId1 = new UserId('testId')
    const name = new UserName('test_user')
    const mail = new MailAddress('test@example.com')
    const id2 = new UserId('testId2')
    const user1 = new User(id1, { name, mail })
    const sameIdAsUser1 = new User(sameAsId1, { name, mail })
    const user2 = new User(id2, { name, mail })

    expect(user1.equals(sameIdAsUser1)).toBe(true)
    expect(user1.equals(user2)).toBe(false)
  })
})
