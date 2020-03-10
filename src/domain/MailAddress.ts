import { ValueObject } from './ValueObject'

export type MailAddressProps = {
  value: string
}

export class MailAddress extends ValueObject<MailAddressProps> {
  static readonly RE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(mailAddress: string) {
    MailAddress.validateMailAddress(mailAddress)
    super({ value: mailAddress })
  }

  protected static validateMailAddress(mailAddress: string): void {
    if (!this.RE.test(mailAddress)) {
      throw new Error(`Invalid mail address: ${mailAddress}`)
    }
  }
}
