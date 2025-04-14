import { Menu } from "@mui/icons-material"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"
import { Link } from "react-router"

import { NavigationEnum } from "@/constants/navigation"
import { useModalsStore } from "@/store/modalsStore"
import styles from "./AppHeader.module.scss"

export default function AppHeader() {
	// Функция для изменения состояния модального окна с навигацией
	const setMobileState = useModalsStore(state => state.setMobileNavModalState)

	const [isShow, setIsShow] = useState<boolean>(true)
	const { scrollY } = useScroll()

	// Скрытие/отображение шапки в зависимости от направления скролла
	useMotionValueEvent(scrollY, "change", latest => {
		const previous = scrollY.getPrevious()

		if (previous) {
			if (latest > 100 && latest > previous) {
				if (latest - previous > 10) setIsShow(false)
			} else {
				if (previous - latest > 10) setIsShow(true)
			}
		}
	})

	return (
		<motion.header
			initial={false}
			animate={isShow ? "show" : "hide"}
			variants={{
				hide: {
					y: "-100%"
				},
				show: {
					y: 0
				}
			}}
			transition={{ duration: 0.25, ease: "easeOut" }}
			className={styles.header}
		>
			<h1 className={styles.logo}>
				<Link to={NavigationEnum.HOME}>PROD Fit</Link>
			</h1>

			<button
				onClick={() => setMobileState(true)}
				className={styles["burger-btn"]}
			>
				<Menu />
			</button>
		</motion.header>
	)
}
