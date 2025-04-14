import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { motion } from "motion/react"
import { Fragment, useMemo, useState } from "react"
import { useNavigate } from "react-router"

import { Button, OutlinedButton } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useExerciseStore } from "@/store/exercisesStore"
import { useModalsStore } from "@/store/modalsStore"
import { useWorkoutsStore } from "@/store/workoutsStore"
import type { ExerciseType } from "@/types/exercise.type"
import type { WorkoutType } from "@/types/workout.type"
import {
	targetValueIsWeightRepeats,
	targetValueIsWeightTime
} from "@/utils/targetValuesTypeGuards"

import styles from "./WorkoutCard.module.scss"

interface IProps {
	data: WorkoutType
}

export default function TrainingCard({ data }: IProps) {
	// Хук для навигации
	const navigate = useNavigate()

	// Список всех упражнений
	const exercises = useExerciseStore(state => state.exercises)
	// Список упражнений, которые есть в плане тренировки
	const filteredExercises = useMemo<ExerciseType[]>(() => {
		const output: ExerciseType[] = []

		data.exercises.forEach(exercise => {
			output.push(exercises.find(({ id }) => id === exercise.id)!)
		})

		return output
	}, [exercises, data.exercises])

	// Состояние отображения плана тренировки
	const [isExercisesShow, setIsExercisesShow] = useState<boolean>(false)

	// Функция удаления упражнения
	const removeWorkout = useWorkoutsStore(state => state.removeWorkout)

	// Функция для изменения состояния модального окна с подробной информацией об упражнении
	const setAboutExerciseTarget = useModalsStore(
		state => state.setAboutExerciseTarget
	)

	// Показать модальное окно с информацией об упражнении
	const toggleExercises = (): void => {
		setIsExercisesShow(!isExercisesShow)
	}

	// Запустить тренировку
	const goToWorkout = (): void => {
		navigate(NavigationEnum.WORKOUT + data.id)
	}

	// Удалить тренировку
	const handleRemoveWorkout = (): void => {
		removeWorkout(data.id)
	}

	return (
		<article className={styles["workout-card"]}>
			<div className={styles.main}>
				<div className={styles.information}>
					<h3 className={styles.title}>{data.title}</h3>

					{data.description && (
						<p className={styles.description}>{data.description}</p>
					)}
				</div>

				<div className={styles.buttons}>
					<Button onClick={goToWorkout}>Запустить</Button>
					<OutlinedButton onClick={handleRemoveWorkout}>Удалить</OutlinedButton>
				</div>
			</div>

			<OutlinedButton
				onClick={toggleExercises}
				className={styles["show_more-btn"]}
			>
				<span className={styles["show_more-btn__text"]}>
					{isExercisesShow ? "Скрыть план" : "Показать план"}
				</span>

				<motion.span
					className={styles["show_more-btn__icon"]}
					initial={false}
					animate={isExercisesShow ? { rotateX: 180 } : { rotateX: 0 }}
				>
					<ArrowDropDownIcon />
				</motion.span>
			</OutlinedButton>

			<motion.div
				initial={false}
				animate={
					isExercisesShow
						? { gridTemplateRows: "1fr" }
						: { gridTemplateRows: "0fr" }
				}
				className={styles.exercises}
			>
				<ol className={styles.exercises__list}>
					{filteredExercises.map((exercise, index) => (
						<Fragment key={`${data.id}-${exercise.id}-${index}`}>
							<li className={styles.stage}>
								<button
									onClick={() => setAboutExerciseTarget(exercise.id)}
									className={styles["exercise-link"]}
									title="Узнать больше об упражнении"
								>
									{exercise.title}
								</button>
								<b>:</b>
								{data.exercises[index].parameter === "время" && (
									<span>
										{" "}
										{data.exercises[index].targetValue as number} секунд
									</span>
								)}
								{data.exercises[index].parameter === "повторения" && (
									<span>
										{" "}
										{data.exercises[index].targetValue as number} повторений
									</span>
								)}
								{data.exercises[index].parameter === "вес-повторения" &&
									targetValueIsWeightRepeats(
										data.exercises[index].targetValue
									) && (
										<span>
											{" "}
											{data.exercises[index].targetValue.weight} кг,{" "}
											{data.exercises[index].targetValue.repeats} повторений
										</span>
									)}
								{data.exercises[index].parameter === "вес-время" &&
									targetValueIsWeightTime(
										data.exercises[index].targetValue
									) && (
										<span>
											{" "}
											{data.exercises[index].targetValue.weight} кг,{" "}
											{data.exercises[index].targetValue.time} повторений
										</span>
									)}
							</li>

							{data.exercises[index].breakTime !== 0 && (
								<li className={styles.stage}>
									Перерыв<b>:</b>
									<span> {data.exercises[index].breakTime} секунд</span>
								</li>
							)}
						</Fragment>
					))}
				</ol>
			</motion.div>

			<div className={styles["mobile-buttons"]}>
				<Button onClick={goToWorkout}>Запустить</Button>
				<OutlinedButton onClick={handleRemoveWorkout}>Удалить</OutlinedButton>
			</div>
		</article>
	)
}
