export type ExerciseType = {
	id: `eid-${number}`
	title: string
	description: string
	difficulty: number
	instruction: string[]
	video?: string
	tags: string[]
	equipment: string[]
	parameter: (typeof exerciseParameters)[number]
}

export const exerciseParameters = [
	"время",
	"повторения",
	"вес-время",
	"вес-повторения"
] as const
