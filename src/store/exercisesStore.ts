import { create } from "zustand"
import { persist } from "zustand/middleware"

import { initExercises } from "@/data/initExercises"
import type { ExerciseType } from "@/types/exercise.type"
import { useWorkoutsStore } from "./workoutsStore"

interface IExerciseStore {
	exercises: ExerciseType[]
	addExercise: (exercise: ExerciseType) => void
	removeExercise: (id: ExerciseType["id"]) => void
}

export const useExerciseStore = create<IExerciseStore>()(
	persist(
		set => ({
			exercises: initExercises,
			// Добавление нового упражнения в каталог упражнений
			addExercise: newExercise =>
				set(state => ({
					exercises: [...state.exercises, newExercise]
				})),
			// Удаление упражнения по его id
			removeExercise: id => {
				const { removeExerciseFromWorkout } = useWorkoutsStore.getState()

				removeExerciseFromWorkout(id)

				set(state => ({
					exercises: state.exercises.filter(item => item.id !== id)
				}))
			}
		}),
		{
			name: "exercises-storage"
		}
	)
)
