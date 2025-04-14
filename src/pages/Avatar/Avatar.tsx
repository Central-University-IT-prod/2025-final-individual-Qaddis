import { type SubmitHandler, useForm } from "react-hook-form"

import UserAvatar from "@/components/common/UserAvatar"
import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import CosmeticsStore from "@/components/screens/Avatar/CosmeticsStore"
import {
	Button,
	Heading,
	Label,
	OutlinedButton,
	UnderlinedInput
} from "@/components/ui"
import { useModalsStore } from "@/store/modalsStore"
import { useUserStore } from "@/store/userStore"
import { type UserType, experienceLevels } from "@/types/user.type"

import styles from "./Avatar.module.scss"

type FormType = Pick<Required<UserType>, "weight" | "experienceLevel">

export default function Avatar() {
	// Данные пользователя
	const user = useUserStore(state => state.user)
	// Функция для изменения данных пользователя
	const setUserData = useUserStore(state => state.changeParams)
	// Функция для выдачи пользователю достижения
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Функция для изменения состояния модального окна подтверждения сброса данных пользователя
	const setModalState = useModalsStore(state => state.setConfirmResetModalState)

	// Хуки для работы с формой обновления параметров пользователя
	const { register, handleSubmit, formState } = useForm<FormType>({
		mode: "onChange",
		defaultValues: {
			weight: user.weight,
			experienceLevel: user.experienceLevel
		}
	})

	// Обработчик события submit у формы обновления параметров пользователя
	const updateUserData: SubmitHandler<FormType> = data => {
		setUserData(data)
		unlockAchievement("aid-1") // Достижение "На кончике пера"
	}

	// Функция для отображения модального окна с подтверждением сброса данных
	const resetUserData = (): void => {
		setModalState(true)
	}

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Персонаж</Heading>

				<div className={styles.content}>
					<div className={styles["first-section"]}>
						<UserAvatar />

						<form
							className={styles["user-data"]}
							onSubmit={handleSubmit(updateUserData)}
						>
							<h3 className={styles.heading}>Параметры пользователя</h3>

							<Label htmlFor="weight-input">Вес</Label>
							<UnderlinedInput
								{...register("weight", {
									required: {
										value: true,
										message: "Это поле является обязательным"
									},
									valueAsNumber: true,
									validate: value => {
										if (isNaN(value))
											return "Некорректный формат: введите целое или десятичное число"
										if (value <= 0)
											return "Некорректные данные: только положительные числа"
									}
								})}
								id="weight-input"
								type="text"
								placeholder="Введите ваш вес (кг)"
							/>
							{formState.errors.weight && (
								<p className={styles.error}>
									{formState.errors.weight.message}
								</p>
							)}

							<Label htmlFor="experience-level-select">Опыт</Label>
							<select
								className={styles.select}
								{...register("experienceLevel")}
								id="experience-level-select"
							>
								{experienceLevels.map(level => (
									<option value={level} key={level}>
										{level.toUpperCase()}
									</option>
								))}
							</select>

							<Button className={styles["submit-btn"]} type="submit">
								Сохранить
							</Button>
							<OutlinedButton
								onClick={resetUserData}
								className={styles["reset-btn"]}
								type="button"
							>
								Сбросить данные
							</OutlinedButton>

							{(!user.experienceLevel || !user.weight) && (
								<p className={styles.reminder}>
									Вы ещё не указали свои параметры!
								</p>
							)}
						</form>
					</div>

					<CosmeticsStore />
				</div>
			</div>
		</PageTransitionLayout>
	)
}
