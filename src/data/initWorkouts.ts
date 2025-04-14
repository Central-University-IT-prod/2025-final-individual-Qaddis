import type { WorkoutType } from "@/types/workout.type"

export const initWorkouts: WorkoutType[] = [
	{
		id: "wid-1",
		title: "Общая силовая тренировка",
		description:
			"Тренировка для укрепления всего тела с акцентом на основные мышечные группы.",
		exercises: [
			{ id: "eid-3", parameter: "повторения", targetValue: 15, breakTime: 60 },
			{ id: "eid-4", parameter: "повторения", targetValue: 12, breakTime: 60 },
			{ id: "eid-6", parameter: "повторения", targetValue: 8, breakTime: 90 },
			{
				id: "eid-12",
				parameter: "вес-повторения",
				targetValue: { weight: 5, repeats: 12 },
				breakTime: 0
			}
		]
	},
	{
		id: "wid-2",
		title: "Кардио и выносливость",
		description:
			"Высокоинтенсивная тренировка для развития выносливости и сжигания калорий.",
		exercises: [
			{ id: "eid-1", parameter: "повторения", targetValue: 10, breakTime: 30 },
			{ id: "eid-9", parameter: "время", targetValue: 30, breakTime: 45 },
			{ id: "eid-2", parameter: "время", targetValue: 40, breakTime: 60 },
			{ id: "eid-5", parameter: "повторения", targetValue: 12, breakTime: 0 }
		]
	},
	{
		id: "wid-3",
		title: "Тренировка для кора и баланса",
		description:
			"Упражнения для укрепления пресса, стабилизаторов и улучшения координации.",
		exercises: [
			{ id: "eid-2", parameter: "время", targetValue: 60, breakTime: 30 },
			{ id: "eid-7", parameter: "время", targetValue: 30, breakTime: 30 },
			{ id: "eid-13", parameter: "повторения", targetValue: 20, breakTime: 45 },
			{ id: "eid-8", parameter: "повторения", targetValue: 15, breakTime: 0 }
		]
	}
]
