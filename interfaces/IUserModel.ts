import { Model, Document } from 'mongoose'

import IUser from './IUser'

export default interface IUserModel extends Model<IUser> {
  signup: (email: string, password: string) => Promise<Document>
  login: (email: string, password: string) => Promise<Document>
}
