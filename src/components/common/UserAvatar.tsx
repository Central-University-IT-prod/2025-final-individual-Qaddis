import { motion } from "motion/react"
import { useMemo } from "react"

import { avatarBackgrounds, avatarFrames } from "@/data/cosmetics"
import { useUserStore } from "@/store/userStore"
import type { CosmeticsType } from "@/types/cosmetics.type"
import { getUserLevel } from "@/utils/userLevel"

import styles from "./UserAvatar.module.scss"

export default function UserAvatar() {
	// Объект с данными пользователя из хранилища
	const user = useUserStore(state => state.user)
	// Получение данных о уровне пользователя
	const userLevel = useMemo(getUserLevel, [user.experience])

	// Выбранный фон аватара
	const userBackground = useMemo<CosmeticsType>(
		() => avatarBackgrounds.find(bg => bg.id === user.selectedBackground)!,
		[user.selectedBackground]
	)

	// Выбранная рамка авата
	const userFrame = useMemo<CosmeticsType>(
		() => avatarFrames.find(frame => frame.id === user.selectedFrame)!,
		[user.selectedFrame]
	)

	return (
		<section className={styles["user-card"]}>
			<div className={`${styles["user-avatar"]} ${styles[userFrame.content]}`}>
				<img
					className={styles.background}
					src={"backgrounds/" + userBackground.content}
					alt="User Avatar card background"
				/>

				<img
					className={styles.avatar}
					src={"avatars/" + userLevel.avatar}
					alt={`User Avatar Lever ${userLevel.level}`}
				/>
			</div>

			<div className={styles.info}>
				<p className={styles.level}>
					Уровень <span>{userLevel.level}</span>
				</p>

				<div className={styles["progress-bar"]}>
					<motion.div
						initial={false}
						animate={{ width: `${userLevel.progress}%` }}
						className={styles.track}
					></motion.div>
				</div>

				<p className={styles.progress}>
					{userLevel.experience} <span>/</span> {userLevel.nextGoal}
				</p>
			</div>
		</section>
	)
}
