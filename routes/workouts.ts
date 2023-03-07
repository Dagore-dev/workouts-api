import express from 'express'
import { createWorkout, deleteWorkoutById, getAllWorkouts, getWorkoutById, updateWorkoutById } from '../controllers/workouts'
import requireAuth from '../middlewares/requireAuth'

const router = express.Router()

router
  .use(requireAuth)
  .get('/', getAllWorkouts)
  .get('/:id', getWorkoutById)
  .post('/', createWorkout)
  .patch('/:id', updateWorkoutById)
  .delete('/:id', deleteWorkoutById)

export default router
