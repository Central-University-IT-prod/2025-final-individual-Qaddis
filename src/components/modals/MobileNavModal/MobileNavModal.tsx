import { useEffect } from "react"

import ModalLayout from "@/components/layouts/ModalLayout"
import { NavLink } from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useModalsStore } from "@/store/modalsStore"
import { togglePageScroll } from "@/utils/togglePageScroll"

import styles from "./MobileNavModal.module.scss"

export default function MobileNavModal() {
	// Состояние модального окна
	const modalState = useModalsStore(state => state.mobileNavModalState)
	// Функция для изменения состояния модального окна
	const setModalState = useModalsStore(state => state.setMobileNavModalState)

	// Функция для закрытия модального окна
	const closeModal = (): void => {
		setModalState(false)
	}

	// Включение/отключение скролла на странице в зависимости от состояния моадлки
	useEffect(() => {
		if (modalState) togglePageScroll("disable")
		else togglePageScroll("enable")
	}, [modalState])

	return (
		modalState && (
			<ModalLayout closeModal={closeModal}>
				<section
					onClick={evt => evt.stopPropagation()}
					className={styles.modal}
				>
					<h2 className={styles.heading}>Навигация</h2>

					<nav className={styles.nav}>
						<NavLink onClick={closeModal} to={NavigationEnum.HOME}>
							Главная
						</NavLink>
						<NavLink onClick={closeModal} to={NavigationEnum.EXERCISES}>
							Упражнения
						</NavLink>
						<NavLink onClick={closeModal} to={NavigationEnum.WORKOUTS}>
							Тренировки
						</NavLink>
						<NavLink onClick={closeModal} to={NavigationEnum.AVATAR}>
							Персонаж
						</NavLink>
						<NavLink onClick={closeModal} to={NavigationEnum.ACHIEVEMENTS}>
							Достижения
						</NavLink>
					</nav>
				</section>
			</ModalLayout>
		)
	)
}
