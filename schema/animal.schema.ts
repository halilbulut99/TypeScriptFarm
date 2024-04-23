import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength } from 'class-validator'
import { Owner } from './owner.schema'
import { Types } from 'mongoose'
import { ObjectIdScalar } from '../object-id.scalar'

@ObjectType()
export class Animal extends BaseModel {

    @Field()
    @Prop({ required: true })
      name: string

    @Field()
    @Prop({ required: true })
      breed: string

    @Field(() => Date)
    @Prop({ required: true })
      birthDate: Date

    @Field(() => Owner)
    @Prop({ ref: Owner, required: true })
      owner: Ref<Owner, Types.ObjectId>
}

export const AnimalModel = getModelForClass(Animal,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class AnimalInput {
    @Field()
    @MinLength(3)
      name: string
    @MinLength(3)
    @Field()
      breed: string
    @IsDate()
    @Field(() => Date)
      birthDate: Date
}

@ObjectType()
export class PaginatedAnimalResponse extends PaginatedResponse(Animal){}
