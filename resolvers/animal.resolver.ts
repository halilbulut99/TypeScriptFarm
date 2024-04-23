import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { AnimalService } from '../services/animal.service'
import { Animal, AnimalInput, PaginatedAnimalResponse } from '../schema/animal.schema'
import { Context } from '../types/context'

@Resolver()
export class AnimalResolver {

  constructor(private animalService: AnimalService) {
    this.animalService = new AnimalService()
  }

  @Query(() => PaginatedAnimalResponse)
  async animals(@Args()paginatedInput: PaginationInput):Promise<PaginatedAnimalResponse> {
    return this.animalService.getAnimals(paginatedInput)
  }

  @Query(() => Animal)
  async animal(@Arg('_id') _id: string):Promise<Animal> {
    return this.animalService.getAnimal(_id)
  }

  @Mutation(() => Animal)
  async createAnimal(@Ctx(){ owner }: Context, @Arg('animal') animal: AnimalInput):Promise<Animal> {
    return this.animalService.createAnimal(animal, owner._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Animal)
  async deleteAnimal(@Arg('_id') _id: string):Promise<Animal> {
    return this.animalService.deleteAnimal(_id)
  }
  @Mutation(() => Animal)
  async updateAnimal(@Arg('_id') _id: string,
                   @Arg('animal') animal: AnimalInput):Promise<Animal> {
    return this.animalService.updateAnimal(_id, animal)
  }

}
