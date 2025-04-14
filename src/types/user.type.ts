import type { AchievementType } from "./achievement.type"
import type { CosmeticsType } from "./cosmetics.type"

export type UserType = {
	// Вес пользователя (влияет на изначальные данные в тренировках)
	weight?: number
	// Спортивный уровень пользователя (влияет на изначальные данные в тренировках)
	experienceLevel?: (typeof experienceLevels)[number]

	experience: number // Игровой опыт пользователя (влияет на аватар)
	coins: number // Кол-во монет у пользователя

	unlockedBackgrounds: CosmeticsType["id"][] // Список открытых фонов аватара
	selectedBackground: CosmeticsType["id"] // Выбранный фон аватара

	unlockedFrames: CosmeticsType["id"][] // Список открытых рамок аватара
	selectedFrame: CosmeticsType["id"] // Выбранная рамка аватара

	// Список разблокированных достижений
	unlockedAchievements: AchievementType["id"][]
}

export const experienceLevels = ["новичок", "продвинутый"] as const
