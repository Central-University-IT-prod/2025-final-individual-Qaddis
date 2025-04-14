import AddIcon from "@mui/icons-material/Add"
import TurnLeftIcon from "@mui/icons-material/TurnLeft"
import { useNavigate } from "react-router"

import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { WorkoutCard } from "@/components/screens/Workouts"
import { Heading } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useWorkoutsStore } from "@/store/workoutsStore"

import styles from "./Workouts.module.scss"

export default function Workouts() {
	// Хук для навигации
	const navigate = useNavigate()

	// Список всех тренировок
	const workouts = useWorkoutsStore(state => state.workouts)

	// Функция для редиректа на страницу создания новой тренировки
	const toCreateNewWorkout = (): void => {
		navigate(NavigationEnum.NEW_WORKOUT)
	}

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Тренировки</Heading>

				{workouts.length > 0 ? (
					<>
						<div className={styles["workouts-list"]}>
							{workouts.map(workout => (
								<WorkoutCard data={workout} key={workout.id} />
							))}
						</div>

						<button
							onClick={toCreateNewWorkout}
							className={styles["new_workout-btn"]}
						>
							<AddIcon />
						</button>

						<p className={styles["bottom-hint"]}>
							<span>Не нашли нужную тренировку? Добавьте</span> <TurnLeftIcon />
						</p>
					</>
				) : (
					<div className={styles["no-content"]}>
						<h3 className={styles["no-content__heading"]}>Пусто...</h3>

						<p className={styles["no-content__hint"]}>
							Но вы можете{" "}
							<button
								className={styles["no-content__btn"]}
								onClick={toCreateNewWorkout}
							>
								добавить новую тренировку
							</button>
						</p>
					</div>
				)}
			</div>
		</PageTransitionLayout>
	)
}
