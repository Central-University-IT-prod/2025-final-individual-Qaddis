export type StageState = "waiting" | "done" | "missed"

export interface IWorkoutState {
	startTime: Date
	activeStageIndex: number
	stageState: "exercise" | "break"
	exerciseStates: StageState[]
	breakStates: StageState[]
}
