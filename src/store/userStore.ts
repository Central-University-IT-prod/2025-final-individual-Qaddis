import { create } from "zustand"
import { persist } from "zustand/middleware"

import { achievements } from "@/data/achievements"
import { initUserData } from "@/data/initUserData"
import { levels } from "@/data/levels"
import type { AchievementType } from "@/types/achievement.type"
import type { CosmeticsType } from "@/types/cosmetics.type"
import type { UserType } from "@/types/user.type"

interface IUserStore {
	user: UserType
	changeParams: (
		params: NonNullable<Pick<UserType, "experienceLevel" | "weight">>
	) => void
	increaseExperience: (value: number) => void
	equipCosmetic: (item: CosmeticsType) => void
	buyCosmetic: (target: CosmeticsType) => void
	unlockAchievement: (achievementId: AchievementType["id"]) => void
	reset: () => void
}

export const useUserStore = create<IUserStore>()(
	persist(
		(set, get) => ({
			user: initUserData,
			// Изменение параметров пользователя
			changeParams: ({ experienceLevel, weight }) =>
				set(({ user }) => ({
					user: { ...user, experienceLevel, weight }
				})),
			//Увеличить опыт
			increaseExperience: value => {
				if (get().user.experience >= levels[levels.length - 1].goal)
					get().unlockAchievement("aid-9") // Достижение "Чемпион"

				set(({ user }) => ({
					user: { ...user, experience: user.experience + value }
				}))
			},
			// Смена фона или рамки
			equipCosmetic: item =>
				set(({ user }) => {
					if (item.type === "background")
						return {
							user: {
								...user,
								selectedBackground: item.id
							}
						}

					return {
						user: {
							...user,
							selectedFrame: item.id
						}
					}
				}),
			// Покупка украшений аватара
			buyCosmetic: target => {
				get().unlockAchievement("aid-8") // Достижение "Модный"

				set(({ user }) => {
					if (target.type === "background")
						return {
							user: {
								...user,
								coins: user.coins - target.price,
								unlockedBackgrounds: [...user.unlockedBackgrounds, target.id],
								selectedBackground: target.id
							}
						}

					return {
						user: {
							...user,
							coins: user.coins - target.price,
							unlockedFrames: [...user.unlockedFrames, target.id],
							selectedFrame: target.id
						}
					}
				})
			},
			// Разблокировка достижения
			unlockAchievement: achievementId =>
				set(({ user }) => {
					if (user.unlockedAchievements.includes(achievementId)) return { user }

					return {
						user: {
							...user,
							coins:
								user.coins +
								achievements.find(item => item.id === achievementId)!.reward,
							unlockedAchievements: [
								...user.unlockedAchievements,
								achievementId
							]
						}
					}
				}),
			// Сброс всех данных
			reset: () => {
				set({ user: initUserData })
				get().unlockAchievement("aid-7") // Достижение "С чистого листа"
			}
		}),
		{
			name: "user-storage"
		}
	)
)
