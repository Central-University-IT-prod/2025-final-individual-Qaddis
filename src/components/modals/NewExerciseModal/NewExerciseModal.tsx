import { useEffect, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import ModalLayout from "@/components/layouts/ModalLayout"
import { InstructionForm, TagsForm } from "@/components/screens/Exercises"
import { Button, Input, Label } from "@/components/ui"
import { useExerciseStore } from "@/store/exercisesStore"
import { useModalsStore } from "@/store/modalsStore"
import { useUserStore } from "@/store/userStore"
import { exerciseParameters, type ExerciseType } from "@/types/exercise.type"
import { togglePageScroll } from "@/utils/togglePageScroll"

import styles from "./NewExerciseModal.module.scss"

interface IForm {
	title: string
	parameter: (typeof exerciseParameters)[number]
	difficulty: number
	description: string
	video: string
}

export default function NewExerciseModal() {
	// Состояние модального окна
	const modalState = useModalsStore(state => state.newExerciseModalState)
	// Функция для изменения состояния модального окна
	const setModalState = useModalsStore(state => state.setNewExerciseModalState)
	// Список всех упражнений
	const exercises = useExerciseStore(state => state.exercises)
	// Функция для добавления нового упражнения
	const addExercise = useExerciseStore(state => state.addExercise)
	// Функция для выдачи пользователю достижения
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Список тегов для нового упражнения
	const [tags, setTags] = useState<string[]>([])
	// Список оборудования для нового упражнения
	const [equipment, setEquipment] = useState<string[]>([])
	// Список шагов инструкции к новому упражнению
	const [stages, setStages] = useState<string[]>([])
	// Глобальная ошибка
	const [globalError, setGlobalError] = useState<string>("")

	// Хук для работы с формой добавления нового упражнений
	const { register, handleSubmit, reset, formState } = useForm<IForm>({
		mode: "onChange"
	})

	// Функция для сброса формы
	const resetForm = (): void => {
		reset()
		setGlobalError("")
		setTags([])
		setEquipment([])
		setStages([])
		setModalState(false)
	}

	// Обработчик события submit у формы добавления нового упражнения
	const submitHandler: SubmitHandler<IForm> = data => {
		// Валидация инструкции
		if (stages.length < 2)
			return setGlobalError("В инструкции должно быть хотя бы два пункта")
		// Валидация тегов
		if (tags.length < 1)
			return setGlobalError("Должен быть указан хотя бы один тег")

		// Генерация уникального id
		let idNumber: number = exercises.length

		do idNumber++
		while (exercises.find(item => item.id === `eid-${idNumber}`))

		// Создание объекта нового упражнения
		const newExercise: ExerciseType = {
			id: `eid-${idNumber}`,
			...data,
			instruction: stages,
			tags,
			equipment
		}

		// Сохранение нового упражнения
		addExercise(newExercise)

		// Сброс формы
		resetForm()

		unlockAchievement("aid-2") // Достижение "Больше активности!"
	}

	// Выключение/включение скролла на странице в зависимости от состояния модалки
	useEffect(() => {
		if (modalState) togglePageScroll("disable")
		else togglePageScroll("enable")
	}, [modalState])

	return (
		modalState && (
			<ModalLayout closeModal={() => setModalState(false)}>
				<section
					onClick={evt => evt.stopPropagation()}
					className={styles.modal}
				>
					<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
						<h2 className={styles.heading}>Добавить упражнение</h2>

						<div className={styles.wrapper}>
							<div className={styles["basic-fields"]}>
								<Label htmlFor="title-input">Название упражнения:</Label>
								<Input
									{...register("title", {
										required: {
											value: true,
											message: "Поле является обязательным"
										},
										minLength: {
											value: 4,
											message: "Недопустимая длинна: не менее 4 символов"
										},
										maxLength: {
											value: 36,
											message: "Недопустимая длинна: не более 36 символов"
										}
									})}
									type="text"
									id="title-input"
									placeholder="Бёрпи"
								/>
								{formState.errors.title && (
									<p className={styles["field-error"]}>
										{formState.errors.title.message}
									</p>
								)}

								<Label htmlFor="parameter-select">
									Настраиваемый параметр:
								</Label>
								<select
									{...register("parameter")}
									className={styles["parameter-select"]}
									id="parameter-select"
								>
									{exerciseParameters.map(param => (
										<option key={param} value={param}>
											{param.toUpperCase()}
										</option>
									))}
								</select>

								<Label htmlFor="difficulty-input">Сложность:</Label>
								<Input
									{...register("difficulty", {
										required: {
											value: true,
											message: "Поле является обязательным"
										},
										valueAsNumber: true,
										min: {
											value: 1,
											message: "Некорректное значение: не меньшее 1"
										},
										max: {
											value: 10,
											message: "Некорректное значение: не больше 10"
										}
									})}
									type="number"
									placeholder="0-10"
									min={1}
									max={10}
									id="difficulty-input"
								/>
								{formState.errors.difficulty && (
									<p className={styles["field-error"]}>
										{formState.errors.difficulty.message}
									</p>
								)}

								<Label htmlFor="description-input">Описание:</Label>
								<textarea
									{...register("description", {
										required: {
											value: true,
											message: "Поле является обязательным"
										},
										minLength: {
											value: 4,
											message: "Недопустимая длинна: не менее 4 символов"
										},
										maxLength: {
											value: 135,
											message: "Недопустимая длинна: не более 135 символов"
										}
									})}
									className={styles["description-input"]}
									id="description-input"
									placeholder="Комплексное упражнение, сочетающее..."
								></textarea>
								{formState.errors.description && (
									<p className={styles["field-error"]}>
										{formState.errors.description.message}
									</p>
								)}

								<Label htmlFor="link-input">Ссылка на видеоинструкцию:</Label>
								<Input
									{...register("video", {
										pattern: {
											value:
												/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
											message: "Некорректный формат: требуется ссылка"
										}
									})}
									type="text"
									id="link-input"
									placeholder="https://www.youtube.com/watch?v=..."
								/>
								{formState.errors.video && (
									<p className={styles["field-error"]}>
										{formState.errors.video.message}
									</p>
								)}
							</div>

							<div className={styles.tags}>
								<h3 className={styles.label}>Тэги</h3>
								<TagsForm tags={tags} setTags={setTags} />

								<h3 className={styles.label}>Оборудование</h3>
								<TagsForm tags={equipment} setTags={setEquipment} />
							</div>

							<div className={styles.instruction}>
								<h3 className={styles.label}>Инструкция:</h3>

								<InstructionForm stages={stages} setStages={setStages} />
							</div>
						</div>

						<Button type="submit">Сохранить</Button>

						{globalError && (
							<p className={styles["global-error"]}>{globalError}</p>
						)}
					</form>
				</section>
			</ModalLayout>
		)
	)
}
