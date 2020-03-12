import { Entity } from '../Entity'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { MailAddress } from './MailAddress'

type UserProps = {
  name: UserName
  mail: MailAddress
}

export class User extends Entity<UserId, UserProps> {
  get name(): UserName {
    return this.props.name
  }

  set name(name: UserName) {
    this.props.name = name
  }

  get mail(): MailAddress {
    return this.props.mail
  }

  set mail(mail: MailAddress) {
    this.props.mail = mail
  }

  constructor(props: UserProps, id?: UserId) {
    super(props, id)
  }
}
