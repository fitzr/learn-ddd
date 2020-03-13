import { DependencyContainer } from 'tsyringe'
import { InMemoryUserRepository } from '../infrastructure/InMemoryUserRepository'

const setupRepositories = (container: DependencyContainer): void => {
  container.register('UserRepository', {
    useValue: container.resolve(InMemoryUserRepository)
  })
}

const setupApplicationServices = (): void => {
  // setup application services
}

const setupDomainServices = (): void => {
  // setup domain services
}

const setup = (container: DependencyContainer): void => {
  setupRepositories(container)
  setupApplicationServices()
  setupDomainServices()
}

export default setup
