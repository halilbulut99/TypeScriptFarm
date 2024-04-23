import { OwnerResolver } from './owner.resolver'
import { AnimalResolver } from './animal.resolver'
export const resolvers = [
  OwnerResolver,
  AnimalResolver,
] as const