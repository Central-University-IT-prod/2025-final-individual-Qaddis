import { Fragment } from "react"

import type { IWorkoutState } from "@/types/workoutState.type"

import styles from "./WorkoutProgress.module.scss"

interface IProps {
	workoutState: IWorkoutState
}

export default function WorkoutProgress({ workoutState }: IProps) {
	return (
		<ul className={styles["progress-menu"]}>
			{workoutState.exerciseStates.map((exState, index) => (
				<Fragment key={`stage-${index}-state`}>
					<li
						className={`${styles.exercise} ${styles[exState]} ${
							workoutState.activeStageIndex === index &&
							workoutState.stageState === "exercise"
								? styles.active
								: ""
						}`}
					></li>

					{workoutState.exerciseStates.length !== index + 1 && (
						<li
							className={`${styles.break} ${
								styles[workoutState.breakStates[index]]
							} ${
								workoutState.activeStageIndex === index &&
								workoutState.stageState === "break"
									? styles.active
									: ""
							}`}
						></li>
					)}
				</Fragment>
			))}
		</ul>
	)
}
