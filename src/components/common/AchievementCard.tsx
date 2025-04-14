import PaidIcon from "@mui/icons-material/Paid"

import type { AchievementType } from "@/types/achievement.type"

import styles from "./AchievementCard.module.scss"

interface IProps {
	data: AchievementType
}

export default function AchievementCard({ data }: IProps) {
	return (
		<article className={styles.achievement}>
			<img
				src={"achievements/" + data.image}
				alt={`Баннер достижения ${data.title}`}
				className={styles.image}
			/>

			<div className={styles.info}>
				<h4 className={styles.title}>{data.title}</h4>

				<p className={styles.description}>{data.description}</p>

				<p className={styles.reward}>
					Награда: <PaidIcon /> <span>{data.reward}</span>
				</p>
			</div>
		</article>
	)
}
