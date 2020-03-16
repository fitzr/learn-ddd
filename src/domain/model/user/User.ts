import { Entity } from '../Entity'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { MailAddress } from './MailAddress'

export type UserProps = {
  name: UserName
  mail: MailAddress
  isPremium?: boolean
}

export class User extends Entity<UserId, UserProps> {
  constructor(id: UserId, props: UserProps) {
    super(id, props)
  }

  get name(): UserName {
    return this.props.name
  }

  changeName(name: UserName): void {
    this.props.name = name
  }

  get mail(): MailAddress {
    return this.props.mail
  }

  changeMail(mail: MailAddress): void {
    this.props.mail = mail
  }

  get isPremium(): boolean {
    return this.props?.isPremium === true
  }
}
