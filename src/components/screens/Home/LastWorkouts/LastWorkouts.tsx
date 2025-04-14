import { useMemo } from "react"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useWorkoutsStore } from "@/store/workoutsStore"
import type { WorkoutType } from "@/types/workout.type"

import styles from "./LastWorkouts.module.scss"

export default function LastWorkouts() {
	// Хук для навигации
	const navigate = useNavigate()

	// Список всех тренировок
	const workouts = useWorkoutsStore(state => state.workouts)

	// Получение 3х последних добавленных тренировок
	const lastTrainings = useMemo<WorkoutType[]>(
		() => workouts.slice(-3),
		[workouts]
	)

	// Функция для запуска тренировки
	const start = (id: WorkoutType["id"]): void => {
		navigate(NavigationEnum.WORKOUT + id)
	}

	// Функция для редиректа на страницу тренировок
	const toWorkouts = (): void => {
		navigate(NavigationEnum.WORKOUTS)
	}

	// Функция для редиректа на страницу создания тренировки
	const toCreateWorkout = (): void => {
		navigate(NavigationEnum.NEW_WORKOUT)
	}

	return (
		<section className={styles["last-workouts"]}>
			{lastTrainings.length > 0 ? (
				lastTrainings.map(training => (
					<article className={styles["last-workout"]} key={training.id}>
						<div className={styles.info}>
							<h3 className={styles.title}>{training.title}</h3>

							{training.description && (
								<p className={styles.description}>{training.description}</p>
							)}
						</div>

						<div className={styles.buttons}>
							<Button onClick={() => start(training.id)}>Запустить</Button>
							<Button onClick={toWorkouts}>Подробнее</Button>
						</div>
					</article>
				))
			) : (
				<div className={styles["no-content"]}>
					<h3>Вы ещё не добавили ни одну тренировку 😢</h3>

					<Button onClick={toCreateWorkout}>Создать тренировку</Button>
				</div>
			)}
		</section>
	)
}
