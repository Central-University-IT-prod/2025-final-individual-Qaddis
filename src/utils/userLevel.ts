import { levels } from "@/data/levels"
import { useUserStore } from "@/store/userStore"

type getUserLevelType = () => {
	level: number
	avatar: string
	experience: number
	nextGoal: number
	progress: number
}

// Получение информации о уровне пользователя и всём, что с ним связано
export const getUserLevel: getUserLevelType = () => {
	const {
		user: { experience }
	} = useUserStore.getState()
	let level: number = 0

	for (let i = 0; i < levels.length; i++) {
		if (experience >= levels[i].goal) {
			level++
		} else break
	}

	const currentGoal: number = levels[level - 1].goal
	const nextGoal: number = levels[level]?.goal ?? currentGoal
	const progress: number = Math.round(
		((experience - currentGoal) / (nextGoal - currentGoal)) * 100
	)

	return {
		level,
		avatar: levels[level - 1].avatar,
		experience,
		nextGoal,
		progress
	}
}
