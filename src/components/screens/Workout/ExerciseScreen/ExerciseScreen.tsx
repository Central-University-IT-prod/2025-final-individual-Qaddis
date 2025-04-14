import YouTubeIcon from "@mui/icons-material/YouTube"
import { useState, type Dispatch, type SetStateAction } from "react"

import { Button, OutlinedButton } from "@/components/ui"
import { useUserStore } from "@/store/userStore"
import type { ExerciseType } from "@/types/exercise.type"
import type { WorkoutExerciseType } from "@/types/workout.type"
import type { IWorkoutState, StageState } from "@/types/workoutState.type"
import {
	targetValueIsWeightRepeats,
	targetValueIsWeightTime
} from "@/utils/targetValuesTypeGuards"
import { Timer } from "../Timer"

import styles from "./ExerciseScreen.module.scss"

interface IProps {
	data: ExerciseType & WorkoutExerciseType
	workoutState: IWorkoutState
	setWorkoutState: Dispatch<SetStateAction<IWorkoutState | undefined>>
}

export default function ExerciseScreen({
	data,
	workoutState,
	setWorkoutState
}: IProps) {
	// Функция увеличения опыта автара пользователя
	const increaseExperience = useUserStore(state => state.increaseExperience)
	// Функция для выдачи достижения пользователя
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Состояние отображения кнопки "Дальше"
	const [timeIsUp, setTimeIsUp] = useState<boolean>(false)

	// Функция завершения упражнения и перехода к следующему этапу
	const next = (newState: StageState): void => {
		setWorkoutState(prev => {
			if (prev) {
				const newExerciseStates = prev.exerciseStates
				newExerciseStates[workoutState.activeStageIndex] = newState

				if (newState === "done") increaseExperience(1)
				else unlockAchievement("aid-4") // Достижение "Ленивый"

				return {
					...prev,
					stageState:
						workoutState.activeStageIndex + 1 ===
						workoutState.exerciseStates.length
							? prev.stageState
							: "break",
					exerciseStates: newExerciseStates,
					activeStageIndex:
						workoutState.activeStageIndex + 1 ===
						workoutState.exerciseStates.length
							? workoutState.activeStageIndex + 1
							: prev.activeStageIndex
				}
			}
		})
	}

	return (
		<div className={styles.screen}>
			<h3 className={styles.title}>
				<span>{workoutState.activeStageIndex + 1}.</span> {data.title}
			</h3>

			<div className={styles.content}>
				<section className={styles.performing}>
					<h4 className={styles.heading}>Цель:</h4>

					{data.parameter === "повторения" &&
						typeof data.targetValue === "number" && (
							<>
								<h5 className={styles.goal}>
									Повторения: <span>{data.targetValue}</span>
								</h5>

								<div className={styles.buttons}>
									<Button onClick={() => next("done")}>Выполнено!</Button>
									<OutlinedButton onClick={() => next("missed")}>
										Пропустить
									</OutlinedButton>
								</div>
							</>
						)}

					{data.parameter === "вес-повторения" &&
						targetValueIsWeightRepeats(data.targetValue) && (
							<>
								<h5 className={styles.goal}>
									Вес: <span>{data.targetValue.weight} кг</span>
								</h5>
								<h5 className={styles.goal}>
									Повторения: <span>{data.targetValue.repeats}</span>
								</h5>

								<div className={styles.buttons}>
									<Button onClick={() => next("done")}>Выполнено!</Button>
									<OutlinedButton onClick={() => next("missed")}>
										Пропустить
									</OutlinedButton>
								</div>
							</>
						)}

					{data.parameter === "вес-время" &&
						targetValueIsWeightTime(data.targetValue) && (
							<>
								<h5 className={styles.goal}>
									Вес: <span>{data.targetValue.weight} кг</span>
								</h5>

								<Timer
									onComplete={() => setTimeIsUp(true)}
									initTime={data.targetValue.time}
								/>

								{timeIsUp ? (
									<div className={styles.buttons}>
										<Button
											className={styles["next-btn"]}
											onClick={() => next("done")}
										>
											Далее
										</Button>
									</div>
								) : (
									<div className={styles.buttons}>
										<OutlinedButton
											className={styles["next-btn"]}
											onClick={() => next("missed")}
										>
											Пропустить
										</OutlinedButton>
									</div>
								)}
							</>
						)}

					{data.parameter === "время" &&
						typeof data.targetValue === "number" && (
							<>
								<Timer
									onComplete={() => setTimeIsUp(true)}
									initTime={data.targetValue}
								/>

								{timeIsUp ? (
									<div className={styles.buttons}>
										<Button
											className={styles["next-btn"]}
											onClick={() => next("done")}
										>
											Далее
										</Button>
									</div>
								) : (
									<div className={styles.buttons}>
										<OutlinedButton
											className={styles["next-btn"]}
											onClick={() => next("missed")}
										>
											Пропустить
										</OutlinedButton>
									</div>
								)}
							</>
						)}
				</section>

				<section className={styles.instruction}>
					<h4 className={styles.heading}>Инструкция по выполнению:</h4>

					<ol className={styles["instruction-stages"]}>
						{data.instruction.map((item, index) => (
							<li
								className={styles["instruction-stage"]}
								key={`instruction-stage-${index}`}
							>
								{item}
							</li>
						))}
					</ol>

					{data.video && (
						<a
							className={styles["instruction-link"]}
							href={data.video}
							target="_blank"
						>
							<YouTubeIcon />
							Видеоинструкция
						</a>
					)}
				</section>
			</div>
		</div>
	)
}
