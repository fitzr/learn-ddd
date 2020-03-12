export class UpdateUserCommand {
  constructor(
    readonly id: string,
    readonly name?: string,
    readonly mail?: string
  ) {}
}
