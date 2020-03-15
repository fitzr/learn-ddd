import shallowEqual from 'shallowequal'

export type ValueObjectProps = {
  [index: string]: any // eslint-disable-line  @typescript-eslint/no-explicit-any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T

  protected constructor(props: T) {
    this.props = Object.freeze(props)
  }

  equals(v?: ValueObject<T>): boolean {
    if (v == undefined || v.props == undefined) {
      return false
    }
    return shallowEqual(this.props, v.props)
  }
}
