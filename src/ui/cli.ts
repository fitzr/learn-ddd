import 'reflect-metadata'
import { container } from 'tsyringe'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'
import * as readline from 'readline'
import { UserApplicationService } from '../application/user/UserApplicationService'
import { RegisterUserCommand } from '../application/user/RegisterUserCommand'

// COMMAND LINE INTERFACE SAMPLE

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const getLine = (function() {
  const getLineGen = (async function*() {
    for await (const line of rl) {
      yield line
    }
  })()
  return async () => (await getLineGen.next()).value
})()
/* eslint-enable */

const main = async (): Promise<void> => {
  container.register('UserRepository', {
    useValue: container.resolve(InMemoryUserRepository)
  })

  for (;;) {
    console.log('Input user name')
    console.log('>')
    const userName = await getLine()

    console.log('Input mail address')
    console.log('>')
    const mailAddress = await getLine()

    if (!userName || !mailAddress) {
      console.log('invalid user name or mail address')
      continue
    }
    const userApplicationService = container.resolve(UserApplicationService)
    const command = new RegisterUserCommand(userName, mailAddress)
    userApplicationService.register(command)

    console.log('---------------')
    console.log('user created')
    console.log('---------------')
    console.log('users:')
    const userRepository = container.resolve<InMemoryUserRepository>(
      'UserRepository'
    )
    for (const user of userRepository.store.values()) {
      console.log(`name:${user.name.value} mail:${user.mail.value}`)
    }
    console.log('---------------')

    console.log('continue? (y/n)')
    console.log('>')
    const input = await getLine()
    if (input == 'n') {
      process.exit(0)
    }
  }
}

main()
