import { NavigationEnum } from "@/constants/navigation"
import { NavLink } from "./ui"

import styles from "./AppFooter.module.scss"

export default function AppFooter() {
	return (
		<footer className={styles.footer}>
			<div className={styles.wrapper}>
				<nav className={styles.nav}>
					<NavLink to={NavigationEnum.HOME}>Главная</NavLink>
					<span className={styles.separator}>/</span>
					<NavLink to={NavigationEnum.EXERCISES}>Каталог упражнений</NavLink>
					<span className={styles.separator}>/</span>
					<NavLink to={NavigationEnum.WORKOUTS}>Тренировки</NavLink>
					<span className={styles.separator}>/</span>
					<NavLink to={NavigationEnum.AVATAR}>Персонаж</NavLink>
					<span className={styles.separator}>/</span>
					<NavLink to={NavigationEnum.ACHIEVEMENTS}>Достижения</NavLink>
				</nav>

				<p className={styles.copyright}>Final Stage Task PROD | by Qaddis</p>
			</div>
		</footer>
	)
}
