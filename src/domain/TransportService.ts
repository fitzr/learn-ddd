import { LogisticsCenter } from './LogisticsCenter'
import { Baggage } from './Baggage'

export class TransportService {
  static transport(
    from: LogisticsCenter,
    to: LogisticsCenter,
    baggage: Baggage
  ): void {
    const shippedBaggage = from.ship(baggage)
    to.receive(shippedBaggage)

    // do something (log or notify the transportation)
  }
}
