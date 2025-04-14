import { useNavigate } from "react-router"

import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { Button } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"

import styles from "./NotFound.module.scss"

export default function NotFound() {
	// Хук для навигации
	const navigate = useNavigate()

	// Функция для редиректа на главную страницу
	const returnToHomePage = (): void => {
		navigate(NavigationEnum.HOME, { replace: true })
	}

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<h2 className={styles.message}>404 Page not found</h2>

				<Button onClick={returnToHomePage}>На главную</Button>
			</div>
		</PageTransitionLayout>
	)
}
