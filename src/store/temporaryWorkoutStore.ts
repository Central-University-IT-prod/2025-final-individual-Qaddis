import type { TempWorkout } from "@/types/workout.type"
import { create } from "zustand"

interface IStore {
	workout: TempWorkout | null
	setWorkout: (newWorkout: TempWorkout) => void
	reset: () => void
}

export const useTemporaryWorkoutStore = create<IStore>(set => ({
	// Временная тренировка
	workout: null,
	// Метод для записи временной тренировки в хранилище
	setWorkout: newWorkout =>
		set({
			workout: newWorkout
		}),
	// Метод для сброса временной тренировки
	reset: () =>
		set({
			workout: null
		})
}))
