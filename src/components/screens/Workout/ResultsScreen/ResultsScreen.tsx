import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { Button, OutlinedButton } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import type { IWorkoutState } from "@/types/workoutState.type"

import { useUserStore } from "@/store/userStore"
import styles from "./ResultsScreen.module.scss"

interface IProps {
	workoutState: IWorkoutState
}

export default function ResultsScreen({ workoutState }: IProps) {
	// Хук для получения параметров из url
	const params = useParams()
	// Хук для навигации
	const navigate = useNavigate()

	// Функция для выдачи достижения пользователя
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Объект с длительностью тренировки
	const [trainingDuration, setTrainingDuration] = useState<{
		seconds: string
		minutes: string
	}>({ seconds: "00", minutes: "00" })

	// Функция запуска тренировки ещё раз
	const startAgain = (): void => {
		location.reload()
	}

	// Функция для перехода на страницу со списком всех тренировок
	const goToWorkouts = (): void => {
		navigate(NavigationEnum.WORKOUTS)
	}

	// Расчёт длительности тренировки
	useEffect(() => {
		const elapsed: number = Date.now() - workoutState.startTime.getTime()

		const seconds: string = Math.floor((elapsed % 60000) / 1000)
			.toString()
			.padStart(2, "0")
		const minutes: string = Math.floor(elapsed / 60000)
			.toString()
			.padStart(2, "0")

		setTrainingDuration({ seconds, minutes })

		unlockAchievement("aid-6")
	}, [])

	return (
		<section className={styles.screen}>
			<h3 className={styles.heading}>Итоги</h3>

			<ul className={styles.stats}>
				<li>
					Тренировка длилась:{" "}
					<span>
						{`${trainingDuration.minutes}:${trainingDuration.seconds}`}
					</span>
				</li>
				<li>
					Кол-во выполненных упражнений:{" "}
					<span>
						{
							workoutState.exerciseStates.filter(state => state === "done")
								.length
						}
					</span>
				</li>
				<li>
					Кол-во пропущенных упражнений:{" "}
					<span>
						{
							workoutState.exerciseStates.filter(state => state === "missed")
								.length
						}
					</span>
				</li>
				<li>
					Кол-во использованных перерывов:{" "}
					<span>
						{workoutState.breakStates.filter(state => state === "done").length}
					</span>
				</li>
				<li>
					Кол-во пропущенных перерывов:{" "}
					<span>
						{
							workoutState.breakStates.filter(state => state === "missed")
								.length
						}
					</span>
				</li>
			</ul>

			<Button onClick={goToWorkouts}>К списку тренировок</Button>

			{params.trainingId !== "temp-workout" && (
				<OutlinedButton onClick={startAgain}>
					Пройти тренировку ещё раз
				</OutlinedButton>
			)}
		</section>
	)
}
