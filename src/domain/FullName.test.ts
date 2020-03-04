import { FullName } from './FullName'

describe('FullName', () => {
  test('is created with props', () => {
    const firstName = 'John'
    const lastName = 'Doe'

    const fullName = new FullName({
      firstName,
      lastName
    })

    expect(fullName.firstName).toBe(firstName)
    expect(fullName.lastName).toBe(lastName)
  })

  test('cannot change props', () => {
    const firstName = 'John'
    const lastName = 'Doe'

    const fullName = new FullName({
      firstName,
      lastName
    })

    expect(() => {
      fullName.props.firstName = 'Mike'
    }).toThrowError(/^Cannot assign to read only property/)
  })

  test('can compare object', () => {
    const firstName = 'John'
    const lastName = 'Doe'

    const fullName1 = new FullName({
      firstName,
      lastName
    })

    const fullName2 = new FullName({
      firstName,
      lastName
    })

    const fullName3 = new FullName({
      firstName: 'Mike',
      lastName
    })

    expect(fullName1.equals(fullName2)).toBe(true)
    expect(fullName1.equals(fullName3)).toBe(false)
  })
})
