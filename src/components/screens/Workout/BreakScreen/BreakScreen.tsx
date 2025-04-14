import type { IWorkoutState, StageState } from "@/types/workoutState.type"
import { type Dispatch, type SetStateAction, useState } from "react"

import { Button, OutlinedButton } from "@/components/ui"
import { useUserStore } from "@/store/userStore"
import { Timer } from "../Timer"

import styles from "./BreakScreen.module.scss"

interface IProps {
	breakTime: number
	workoutState: IWorkoutState
	setWorkoutState: Dispatch<SetStateAction<IWorkoutState | undefined>>
}

export default function BreakScreen({
	breakTime,
	workoutState,
	setWorkoutState
}: IProps) {
	// Функция для выдачи достижения пользователя
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Состояние отображения кнопки "Дальше"
	const [isBtnsShow, setIsBtnsShow] = useState<boolean>(false)

	// Функция для перехода к следующему упражнению
	const next = (newState: StageState): void => {
		setWorkoutState(prev => {
			if (prev) {
				const newBreakStates = prev.breakStates
				newBreakStates[workoutState.activeStageIndex] = newState

				// Достижение "Ни секунды на отдых"
				if (newState === "missed") unlockAchievement("aid-5")

				return {
					...prev,
					stageState: "exercise",
					breakStates: newBreakStates,
					activeStageIndex: workoutState.activeStageIndex + 1
				}
			}
		})
	}

	return (
		<section className={styles.screen}>
			<h3 className={styles.title}>
				Перерыв <span>{workoutState.activeStageIndex + 1}</span>
			</h3>

			<Timer
				onComplete={() => setIsBtnsShow(true)}
				initTime={breakTime}
				canAdjust={true}
			/>

			{isBtnsShow ? (
				<Button onClick={() => next("done")}>Дальше</Button>
			) : (
				<OutlinedButton onClick={() => next("missed")}>
					Пропустить
				</OutlinedButton>
			)}
		</section>
	)
}
