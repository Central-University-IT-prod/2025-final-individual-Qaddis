import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"

import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import {
	BreakScreen,
	ExerciseScreen,
	ResultsScreen,
	WorkoutProgress
} from "@/components/screens/Workout/"
import { Button, Heading } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useExerciseStore } from "@/store/exercisesStore"
import { useTemporaryWorkoutStore } from "@/store/temporaryWorkoutStore"
import { useWorkoutsStore } from "@/store/workoutsStore"
import type { ExerciseType } from "@/types/exercise.type"
import type { TempWorkout, WorkoutType } from "@/types/workout.type"
import type { IWorkoutState } from "@/types/workoutState.type"

import styles from "./Workout.module.scss"

type ProcessedWorkoutType = WorkoutType | TempWorkout | undefined

export default function Workout() {
	// Хук для получения параметров из url
	const params = useParams()
	// Хук для навигации
	const navigate = useNavigate()

	// Список всех тренировок
	const allWorkouts = useWorkoutsStore(state => state.workouts)
	// Временная тренировка
	const tempWorkout = useTemporaryWorkoutStore(state => state.workout)
	// Функция для удаления временной тренировки
	const removeTempWorkout = useTemporaryWorkoutStore(state => state.reset)
	// Список всех упражнений
	const allExercises = useExerciseStore(state => state.exercises)

	// "Локальный" экземпляр временной тренировки
	const [localTempWorkout, setLocalTempWorkout] = useState<TempWorkout>()

	// Состояние тренировки
	const [workoutState, setWorkoutState] = useState<IWorkoutState>()

	// Создание "локальной" копии временной тренировки и удаление её из хранилища
	useEffect(() => {
		if (params.trainingId === "temp-workout" && tempWorkout) {
			setLocalTempWorkout(tempWorkout)
			removeTempWorkout()
		}
	}, [params.trainingId, tempWorkout])

	// Запущенная тренировка
	const workout = useMemo<ProcessedWorkoutType>(() => {
		if (params.trainingId === "temp-workout") return localTempWorkout

		return allWorkouts.find(item => item.id === params.trainingId)
	}, [params.trainingId, tempWorkout, allWorkouts])

	// Список упражнений тренировки
	const exercises = useMemo<ExerciseType[]>(
		() =>
			workout
				? workout.exercises.map(
						workoutEx =>
							allExercises.find(exercise => exercise.id === workoutEx.id)!
				  )
				: [],
		[workout, allExercises]
	)

	// Редирект на страницу со списком всех тренировок
	const goBack = (): void => {
		navigate(NavigationEnum.WORKOUTS, { replace: true })
	}

	// Создание объекта состояния тренировки при запуске тренировки
	useEffect(() => {
		if (workout)
			setWorkoutState({
				startTime: new Date(),
				activeStageIndex: 0,
				stageState: "exercise",
				exerciseStates: new Array(workout.exercises.length).fill("waiting"),
				breakStates: new Array(workout.exercises.length - 1).fill("waiting")
			})
	}, [workout])

	return (
		<PageTransitionLayout>
			{workout && workoutState ? (
				<div className={styles.page}>
					<Heading>{workout.title}</Heading>

					{workoutState.activeStageIndex >=
					workoutState.exerciseStates.length ? (
						<ResultsScreen workoutState={workoutState} />
					) : (
						<>
							{workoutState.stageState === "exercise" ? (
								<ExerciseScreen
									data={{
										...exercises[workoutState.activeStageIndex],
										...workout.exercises[workoutState.activeStageIndex]
									}}
									workoutState={workoutState}
									setWorkoutState={setWorkoutState}
								/>
							) : (
								<BreakScreen
									breakTime={
										workout.exercises[workoutState.activeStageIndex].breakTime
									}
									workoutState={workoutState}
									setWorkoutState={setWorkoutState}
								/>
							)}

							<WorkoutProgress workoutState={workoutState} />
						</>
					)}
				</div>
			) : (
				<div className={styles["not-found"]}>
					<Heading>Тренировка не найдена</Heading>

					<Button onClick={goBack}>Назад</Button>
				</div>
			)}
		</PageTransitionLayout>
	)
}
