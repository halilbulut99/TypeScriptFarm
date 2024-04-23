import { ObjectId } from 'mongodb'
import { ArgsType, Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import { UserRole } from '../enums/user-role'
import { ObjectIdScalar } from '../object-id.scalar'
import { IsEmail, MinLength, MaxLength } from 'class-validator'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'
import { Types } from 'mongoose'

registerEnumType(UserRole, {
  name: 'UserRole',
})
@ObjectType()
export class Owner extends BaseModel {

    @Prop({ required: true })
    @Field()
      firstName: string
    @Prop({ required: true })
    @Field()
      lastName: string
    @Prop({ required: true })
    @Field()
      email: string
    @Prop({ required: true })
    @Field()
      password: string
    @Prop()
    @Field({ nullable:true })
      address?:string
    @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
    @Field(() => [UserRole])

      roles: UserRole[]

    @Prop({ ref: () => Owner })
    @Field(() => [Owner], { nullable: true })
      friends?: Ref<Owner, Types.ObjectId>[]
}

export const OwnerModel = getModelForClass(Owner,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class BaseOwnerInput {
  @Field()
  @MaxLength(30)
    firstName: string
  @Field()
  @MaxLength(30)
    lastName: string
  @Field()
  @MinLength(6)
    password: string
  @Field({ nullable:true })
    address?:string
    @Field(() => [ObjectIdScalar], { nullable:true })
      friends?:Ref<Owner, Types.ObjectId>[]
}
@InputType()
export class CreateOwnerInput extends BaseOwnerInput {
  @Field()
  @IsEmail()
    email: string
}

@ObjectType()
export class PaginatedOwnerResponse extends PaginatedResponse(Owner){}

@ArgsType()
export class OwnerLoginArgs {
  @Field()
  @IsEmail()
    email: string
  @MinLength(6)
  @Field()
    password: string
}