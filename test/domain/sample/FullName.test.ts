import { FullName } from '../../../src/domain/sample/FullName'

describe('FullName', () => {
  test('is created with props', () => {
    const fullName = FullName.create('John', 'Doe')
    expect(fullName.firstName).toBe('John')
    expect(fullName.lastName).toBe('Doe')
  })

  test('cannot change props', () => {
    const fullName = FullName.create('John', 'Doe')
    expect(() => {
      fullName.props.firstName = 'Mike'
    }).toThrowError(/^Cannot assign to read only property/)
  })

  test('can compare object', () => {
    const fullName1 = FullName.create('John', 'Doe')
    const fullName2 = FullName.create('John', 'Doe')
    const fullName3 = FullName.create('Mike', 'Doe')

    expect(fullName1.equals(fullName2)).toBe(true)
    expect(fullName1.equals(fullName3)).toBe(false)
  })

  test('validates first name', () => {
    expect(() => {
      FullName.create('J0hn', 'Doe')
    }).toThrowError('First name: "J0hn" is not valid.')
  })

  test('validates last name', () => {
    expect(() => {
      FullName.create('John', '')
    }).toThrowError('Last name: "" is not valid.')
  })
})
