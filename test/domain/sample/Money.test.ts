import { Money } from '../../../src/domain/sample/Money'

describe('Money', () => {
  test('adds same money', () => {
    const a = Money.create(1000, 'JPY')
    const b = Money.create(800, 'JPY')
    const result = a.add(b)

    expect(result.currency).toBe('JPY')
    expect(result.amount).toBe(1800)
  })

  test('should not add different currency', () => {
    const a = Money.create(1000, 'JPY')
    const b = Money.create(800, 'USD')
    expect(() => {
      a.add(b)
    }).toThrowError('Cannot add Money; Currency JPY and USD are not the same.')
  })
})
