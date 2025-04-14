import { useEffect } from "react"

import ModalLayout from "@/components/layouts/ModalLayout"
import { Button } from "@/components/ui"
import { useModalsStore } from "@/store/modalsStore"
import { useUserStore } from "@/store/userStore"
import { togglePageScroll } from "@/utils/togglePageScroll"

import styles from "./ConfirmResetModal.module.scss"

export default function ConfirmResetModal() {
	// Состояние модального окна
	const modalState = useModalsStore(state => state.confirmResetModalState)
	// Функция для изменения состояния модального окна
	const setModalState = useModalsStore(state => state.setConfirmResetModalState)
	// Функция для удаления данных о пользователе из хранилища
	const resetData = useUserStore(state => state.reset)

	// Функция для закрытия модального окна
	const closeModal = (): void => {
		setModalState(false)
	}

	// Функция для сброса данных о пользователе
	const confirmReset = (): void => {
		resetData()

		location.reload()
	}

	// Включение/отключение скролла на странице при изменении состояния модалки
	useEffect(() => {
		if (modalState) togglePageScroll("disable")
		else togglePageScroll("enable")
	}, [modalState])

	return (
		modalState && (
			<ModalLayout closeModal={closeModal}>
				<div className={styles.modal}>
					<h3 className={styles.heading}>Сброс данных пользователя</h3>

					<p className={styles.warning}>
						В случае сброса данных вы сбросите не только параметры пользователя,
						но и потеряете прогресс прокачки персонажа, все косметические
						предметы, достижения и монеты.
						<br />
						<span> Вы уверены, что хотите сбросить данные?</span>
					</p>

					<div className={styles.buttons}>
						<Button onClick={confirmReset}>Да</Button>
						<Button onClick={closeModal}>Нет</Button>
					</div>
				</div>
			</ModalLayout>
		)
	)
}
