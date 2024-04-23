import { Request } from 'express'
import { Owner } from '../schema/owner.schema'
export interface Context {
    req: Request,
    owner: Owner,
    ip: any,
    // location: any,
    md: any,
}
