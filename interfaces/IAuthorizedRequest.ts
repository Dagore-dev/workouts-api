import express from 'express'
import IUser from './IUser'
import { Document, Types } from 'mongoose'

export default interface IAuthorizedRequest extends express.Request {
  user: (Document<unknown, {}, IUser> & Omit<IUser & {
    _id: Types.ObjectId
  }, never>) | null
}
