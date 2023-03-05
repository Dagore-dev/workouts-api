import { Model, Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  email: string
  password: string
}

interface UserModel extends Model<IUser> {
  signup: (email: string, password: string) => Promise<Document>
}

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.signup = async function (email: string, password: string): Promise<Document> {
  const exists = await this.findOne({ email })

  if (exists != null) {
    throw new Error(`"${email}" already in use`)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hashedPassword })

  return user
}

export default model<IUser, UserModel>('User', userSchema)
