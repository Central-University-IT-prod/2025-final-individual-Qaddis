import { ExerciseType } from "./exercise.type"

export type WorkoutType = {
	id: `wid-${number}`
	title: string
	description?: string
	exercises: WorkoutExerciseType[]
}

export type TempWorkout = {
	id: "temp-workout"
} & Omit<WorkoutType, "id">

export type WorkoutExerciseType = {
	id: ExerciseType["id"]
	parameter: ExerciseType["parameter"]
	targetValue:
		| number
		| { weight: number; time: number }
		| { weight: number; repeats: number }
	breakTime: number
}
