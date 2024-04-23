import { Owner } from '../schema/owner.schema'

declare module 'express' {

    export interface Request {
        owner: Owner
    }
}
