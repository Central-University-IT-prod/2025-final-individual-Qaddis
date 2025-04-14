import UserAvatar from "@/components/common/UserAvatar"
import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { LastAchievement, LastWorkouts } from "@/components/screens/Home/"
import { Heading } from "@/components/ui"

import styles from "./Home.module.scss"

export default function Home() {
	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Главная</Heading>

				<div className={styles.content}>
					<UserAvatar />

					<div className={styles.stats}>
						<LastAchievement />

						<LastWorkouts />
					</div>
				</div>
			</div>
		</PageTransitionLayout>
	)
}
