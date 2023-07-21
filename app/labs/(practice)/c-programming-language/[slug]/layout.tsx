import React from 'react'
import ExerciseLayout from '../../../components/exercise-layout'

const CProgrammingExerciseLayout = ({ children }: { children: React.ReactNode }) => (
  <ExerciseLayout project="c-programming-language">
    {children}
  </ExerciseLayout>
)

export default CProgrammingExerciseLayout