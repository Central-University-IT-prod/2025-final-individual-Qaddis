import { useMemo } from "react"

import AchievementCard from "@/components/common/AchievementCard"
import { achievements } from "@/data/achievements"
import { useUserStore } from "@/store/userStore"
import type { AchievementType } from "@/types/achievement.type"

import styles from "./LastAchievement.module.scss"

export default function LastAchievement() {
	// Данные пользователя
	const user = useUserStore(state => state.user)

	// Получение последнего полученного пользователем достижения
	const lastAchievement = useMemo<AchievementType | undefined>(() => {
		if (user.unlockedAchievements.length > 0)
			return achievements.find(
				achievement =>
					achievement.id ===
					user.unlockedAchievements[user.unlockedAchievements.length - 1]
			)
		else return undefined
	}, [user.unlockedAchievements])

	return (
		<section className={styles["last-achievement"]}>
			{lastAchievement ? (
				<AchievementCard data={lastAchievement} />
			) : (
				<h3 className={styles["no-content"]}>
					Вы ещё не разблокировали ни одно достижение 😢
				</h3>
			)}
		</section>
	)
}
