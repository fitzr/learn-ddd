import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { UserApplicationService } from '../../application/user/UserApplicationService'
import { RegisterUserCommand } from '../../application/user/RegisterUserCommand'
import { UpdateUserCommand } from '../../application/user/UpdateUserCommand'
import { GetUserCommand } from '../../application/user/GetUserCommand'

@injectable()
export class UserController {
  constructor(private readonly service: UserApplicationService) {
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
    this.put = this.put.bind(this)
  }

  post(req: Request, res: Response): void {
    const { name, mail } = req.body
    const command = new RegisterUserCommand(name, mail)
    try {
      this.service.register(command)
      res.status(200).send('ok')
    } catch (e) {
      console.error(e)
      res.status(400).send(e.message)
    }
  }

  get(req: Request, res: Response): void {
    const command = new GetUserCommand(req.params.id)
    const user = this.service.get(command)
    if (user) {
      res.send(JSON.stringify(user))
    } else {
      res.status(404).send('not found')
    }
  }

  put(req: Request, res: Response): void {
    const { name, mail } = req.body
    const command = new UpdateUserCommand(req.params.id, name, mail)
    try {
      this.service.update(command)
      res.status(200).send('ok')
    } catch (e) {
      console.error(e)
      res.status(400).send(e.message)
    }
  }
}
