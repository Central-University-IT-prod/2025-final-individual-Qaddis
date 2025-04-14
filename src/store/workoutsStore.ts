import { create } from "zustand"
import { persist } from "zustand/middleware"

import { initWorkouts } from "@/data/initWorkouts"
import type { ExerciseType } from "@/types/exercise.type"
import type { WorkoutType } from "@/types/workout.type"

interface ITrainingsStore {
	workouts: WorkoutType[]
	addWorkout: (workout: WorkoutType) => void
	removeWorkout: (workoutId: WorkoutType["id"]) => void
	removeExerciseFromWorkout: (exerciseId: ExerciseType["id"]) => void
}

export const useWorkoutsStore = create<ITrainingsStore>()(
	persist(
		set => ({
			workouts: initWorkouts,
			// Добавление новой тренировки
			addWorkout: workout =>
				set(state => ({
					workouts: [...state.workouts, workout]
				})),
			// Удаление тренировки по её id
			removeWorkout: workoutId =>
				set(state => ({
					workouts: state.workouts.filter(training => training.id !== workoutId)
				})),
			// Удаление упражнения из тренировки
			removeExerciseFromWorkout: exerciseId =>
				set(state => {
					const workouts: WorkoutType[] = []

					state.workouts.forEach(workout => {
						const exercises = workout.exercises.filter(
							exercise => exercise.id !== exerciseId
						)

						if (exercises.length > 0) workouts.push({ ...workout, exercises })
					})

					return { workouts }
				})
		}),
		{
			name: "workouts-storage"
		}
	)
)
