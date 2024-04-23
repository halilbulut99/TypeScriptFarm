import { BaseOwnerInput, CreateOwnerInput, Owner, OwnerModel } from '../schema/owner.schema'
import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { AppError } from '../utils/error'
import { ErrorCodes } from '../constants/error-codes'
import { generateToken } from '../utils/token'
import bcryptjs from 'bcryptjs'

export class OwnerService {
  async getOwners(paginatedInput: PaginationInput) {
    const ownerPaginationServices =
        new PaginationService({ model:  OwnerModel })
    return ownerPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getOwner(_id: string) {
    return OwnerModel.findById(_id).lean()
  }
  async createOwner(owner: CreateOwnerInput) {
    const password = bcryptjs.hashSync(owner.password, 10)
    const ownerData = { ...owner, password }
    const createdOwner = await OwnerModel.create(ownerData)
    return generateToken(createdOwner._id, createdOwner.roles)
  }
  async deleteOwner(_id: string) {
    return OwnerModel.findByIdAndRemove(_id)
  }
  async updateOwner(_id: string, owner: BaseOwnerInput) {
    return OwnerModel.findByIdAndUpdate(_id, owner, { new: true })
  }

  async login(email: string, password: string) {
    const owner = await OwnerModel.findOne({ email }).lean()
    if(!owner) {
      throw AppError('Owner not found', ErrorCodes.BAD_USER_INPUT)
    }
    const isMatching = await bcryptjs.compare(password, owner.password)
    if(!isMatching) {
      throw AppError('Owner not found', ErrorCodes.BAD_USER_INPUT)
    }
    return generateToken(owner._id, owner.roles)
  }

  async currentOwner(owner: Owner) {
    if(!owner?._id) {
      throw AppError('Unauthenticated', ErrorCodes.UNAUTHENTICATED)
    }
    return OwnerModel.findById(owner._id).lean()
  }
}