import { Id } from './Id'

export abstract class Entity<V extends Id, T> {
  protected constructor(readonly id: V, readonly props: T) {}

  public equals(v?: Entity<V, T>): boolean {
    if (v == undefined || this.id == undefined) {
      return false
    }
    if (this === v) {
      return true
    }
    return this.id.equals(v.id)
  }
}
