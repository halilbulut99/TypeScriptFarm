import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { AnimalInput, AnimalModel } from '../schema/animal.schema'
import { Types } from 'mongoose'

export class AnimalService {
  async getAnimals(paginatedInput: PaginationInput) {
    const ownerPaginationServices =
        new PaginationService(
          {
            model: AnimalModel,
            populate: 'owner',
          })
    return ownerPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getAnimal(_id: string) {
    return AnimalModel.findById(_id).populate('owner').lean()
  }
  async createAnimal(animal: AnimalInput, owner: Types.ObjectId) {
    const animalWithOwner = { ...animal, owner }
    const createdAnimal = await AnimalModel.create(animalWithOwner)
    return createdAnimal.populate('owner')
  }
  async deleteAnimal(_id: string) {
    return AnimalModel.findByIdAndRemove(_id).populate('owner')
  }
  async updateAnimal(_id: string, animal: AnimalInput) {
    return AnimalModel.findByIdAndUpdate(_id, animal, { new: true }).populate('owner')
  }
}