import LockIcon from "@mui/icons-material/Lock"
import { useMemo } from "react"

import AchievementCard from "@/components/common/AchievementCard"
import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { Heading } from "@/components/ui"
import { achievements } from "@/data/achievements"
import { useUserStore } from "@/store/userStore"
import type { AchievementType } from "@/types/achievement.type"

import styles from "./Achievements.module.scss"

interface IAchievements {
	unlocked: AchievementType[]
	locked: AchievementType[]
}

export default function Achievements() {
	// ID всех открытых пользователем достижений
	const unlockedAchievements = useUserStore(
		state => state.user.unlockedAchievements
	)

	// Получение всех достижений (выполенные и невыполненные)
	const allAchievements = useMemo<IAchievements>(() => {
		const locked: AchievementType[] = []
		const unlocked: AchievementType[] = []

		achievements.forEach(achievement => {
			if (unlockedAchievements.includes(achievement.id))
				unlocked.push(achievement)
			else locked.push(achievement)
		})

		return { locked, unlocked }
	}, [unlockedAchievements])

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Достижения</Heading>

				<div className={styles.content}>
					<h3 className={styles.heading}>Полученные</h3>

					{allAchievements.unlocked.length > 0 ? (
						<div className={styles.achievements}>
							{allAchievements.unlocked.map(achievement => (
								<AchievementCard key={achievement.id} data={achievement} />
							))}
						</div>
					) : (
						<p className={styles["no-achievements"]}>
							Вы ещё не разблокировали ни одного достижения 😢
						</p>
					)}

					<hr className={styles.separator} />

					<h3 className={styles.heading}>Неполученные</h3>

					{allAchievements.locked.length > 0 ? (
						<div className={styles.achievements}>
							{allAchievements.locked.map((_, index) => (
								<article
									className={styles["locked-achievement"]}
									key={`locked-achievement-${index}`}
								>
									<div className={styles["locked-achievement__image"]}>
										<LockIcon />
									</div>

									<div className={styles["locked-achievement__info"]}>
										<h4>Неизвестное достижение</h4>

										<p>Вы ещё не открыли данное достижение</p>
									</div>
								</article>
							))}
						</div>
					) : (
						<p className={styles["no-achievements"]}>
							Вы уже разблокировали все достижения 🎉
						</p>
					)}
				</div>
			</div>
		</PageTransitionLayout>
	)
}
