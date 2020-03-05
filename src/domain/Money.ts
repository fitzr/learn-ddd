import { ValueObject } from './ValueObject'

type MoneyProps = {
  amount: number
  currency: string
}

export class Money extends ValueObject<MoneyProps> {
  get amount(): number {
    return this.props.amount
  }

  get currency(): string {
    return this.props.currency
  }

  private constructor(props: MoneyProps) {
    super(props)
  }

  add(v: Money): Money {
    if (this.currency !== v.currency) {
      throw new Error(
        `Cannot add Money; Currency ${this.currency} and ${v.currency} are not the same.`
      )
    }
    return Money.create(this.amount + v.amount, this.currency)
  }

  static create(amount: number, currency: string): Money {
    if (!/^[A-Z]+$/.test(currency)) {
      throw new Error(`Currency: "${currency}" must be [A-Z]+`)
    }
    return new Money({ amount, currency })
  }
}
