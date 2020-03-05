import { ValueObject, ValueObjectProps } from './ValueObject'

export abstract class Entity<V extends ValueObject<ValueObjectProps>, T> {
  readonly id: V
  readonly props: T

  protected constructor(id: V, props: T) {
    this.id = id
    this.props = props
  }

  public equals(v?: Entity<V, T>): boolean {
    if (v === null || v === undefined) {
      return false
    }
    if (this === v) {
      return true
    }
    return this.id.equals(v.id)
  }
}
