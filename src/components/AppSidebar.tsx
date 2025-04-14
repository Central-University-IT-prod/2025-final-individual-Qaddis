import {
	EmojiEvents,
	FitnessCenter,
	Home,
	Person4,
	WebStories
} from "@mui/icons-material"
import { motion } from "motion/react"

import { NavigationEnum } from "@/constants/navigation"
import { SidebarLink } from "./ui"

import styles from "./AppSidebar.module.scss"

export default function AppSidebar() {
	return (
		<motion.aside
			className={styles.sidebar}
			initial="inactive"
			whileHover="active"
		>
			<motion.h1
				className={styles.title}
				variants={{ inactive: { width: "1.2em" }, active: { width: "auto" } }}
				transition={{ duration: 0.2 }}
			>
				PROD Fit
			</motion.h1>

			<nav className={styles.nav}>
				<SidebarLink to={NavigationEnum.HOME} icon={<Home />}>
					Главная
				</SidebarLink>
				<SidebarLink to={NavigationEnum.EXERCISES} icon={<WebStories />}>
					Упражнения
				</SidebarLink>
				<SidebarLink to={NavigationEnum.WORKOUTS} icon={<FitnessCenter />}>
					Тренировки
				</SidebarLink>
				<SidebarLink to={NavigationEnum.AVATAR} icon={<Person4 />}>
					Персонаж
				</SidebarLink>
				<SidebarLink to={NavigationEnum.ACHIEVEMENTS} icon={<EmojiEvents />}>
					Достижения
				</SidebarLink>
			</nav>
		</motion.aside>
	)
}
