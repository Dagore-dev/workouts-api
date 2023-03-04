import { Schema, model } from 'mongoose'

const workoutsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  repetitions: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default model('Workout', workoutsSchema)
