import React from 'react'
import ExerciseLayout from '../../../components/exercise-layout'

const EloquentExerciseLayout = ({ children }: { children: React.ReactNode }) => (
  <ExerciseLayout project="eloquent-js">
    {children}
  </ExerciseLayout>
)

export default EloquentExerciseLayout