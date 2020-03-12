import { Entity } from '../Entity'
import { Id } from '../Id'

export class BaggageId extends Id {
  constructor(value: string) {
    super(value)
  }
}

type BaggageProps = {
  contents: string // dummy
}

export class Baggage extends Entity<BaggageId, BaggageProps> {
  constructor(props: BaggageProps, id: BaggageId) {
    super(props, id)
  }
}
