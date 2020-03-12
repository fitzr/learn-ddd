import { Entity } from '../Entity'
import { Id } from '../Id'
import { Baggage } from './Baggage'

export class LogisticsCenterId extends Id {
  constructor(value: string) {
    super(value)
  }
}

type LogisticsCenterProps = {
  baggageList: Baggage[]
}

export class LogisticsCenter extends Entity<
  LogisticsCenterId,
  LogisticsCenterProps
> {
  constructor(props: LogisticsCenterProps, id: LogisticsCenterId) {
    super(props, id)
  }

  ship(baggage: Baggage): Baggage {
    this.props.baggageList = this.props.baggageList.filter(
      b => !b.equals(baggage)
    )
    // do something
    return baggage
  }

  receive(baggage: Baggage): void {
    this.props.baggageList.push(baggage)
  }
}
