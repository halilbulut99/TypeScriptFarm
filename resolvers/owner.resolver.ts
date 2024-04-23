import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { OwnerService } from '../services/owner.service'
import { BaseOwnerInput, CreateOwnerInput, PaginatedOwnerResponse, Owner, OwnerLoginArgs } from '../schema/owner.schema'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { Context } from '../types/context'

@Resolver()
export class OwnerResolver {

  constructor(private ownerService: OwnerService) {
    this.ownerService = new OwnerService()
  }

    @Query(() => PaginatedOwnerResponse)
  async owners(@Args()paginatedInput: PaginationInput):Promise<PaginatedOwnerResponse> {
    return this.ownerService.getOwners(paginatedInput)
  }

  @Query(() => Owner)
    async owner(@Arg('_id') _id: string):Promise<Owner> {
      return this.ownerService.getOwner(_id)
    }

  @Mutation(() => String)
  async createOwner(@Arg('owner') owner: CreateOwnerInput):Promise<string> {
    return this.ownerService.createOwner(owner)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Owner)
  async deleteOwner(@Arg('_id') _id: string):Promise<Owner> {
    return this.ownerService.deleteOwner(_id)
  }
  @Mutation(() => Owner)
  async updateOwner(@Arg('_id') _id: string,
                   @Arg('owner') owner: BaseOwnerInput):Promise<Owner> {
    return this.ownerService.updateOwner(_id, owner)
  }

  @Mutation(() => String)
  async login(@Args() { email, password }: OwnerLoginArgs):Promise<string> {
    return this.ownerService.login(email, password)
  }

  @Query(() => Owner)
  async currentOwner(@Ctx(){ owner }: Context): Promise<Owner> {
    return this.ownerService.currentOwner(owner)
  }
}
