import jwt from 'jsonwebtoken'

export default function createToken (id: string): string {
  const secret = process.env.SECRET
  if (secret == null) {
    throw new Error('No variable named "SECRET" in environment.')
  }

  return jwt.sign({ id }, secret, { expiresIn: '1d' })
}
