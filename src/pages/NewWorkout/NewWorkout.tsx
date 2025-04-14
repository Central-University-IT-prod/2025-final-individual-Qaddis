import { Add, Delete, Remove } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { ExerciseInput } from "@/components/screens/NewWorkout"
import {
	Button,
	Heading,
	Input,
	Label,
	OutlinedButton,
	UnderlinedInput
} from "@/components/ui"
import { NavigationEnum } from "@/constants/navigation"
import { useModalsStore } from "@/store/modalsStore"
import { useTemporaryWorkoutStore } from "@/store/temporaryWorkoutStore"
import { useUserStore } from "@/store/userStore"
import { useWorkoutsStore } from "@/store/workoutsStore"
import type { ExerciseType } from "@/types/exercise.type"
import type { WorkoutExerciseType, WorkoutType } from "@/types/workout.type"

import styles from "./NewWorkout.module.scss"

export default function NewWorkout() {
	// Хук для навигации
	const navigate = useNavigate()

	// Данные пользователя
	const user = useUserStore(state => state.user)
	// Список тренировок
	const workouts = useWorkoutsStore(state => state.workouts)
	// Функция для добавления новой тренировки
	const addWorkout = useWorkoutsStore(state => state.addWorkout)
	// Функция для добавления временной тренировки
	const setTempWorkout = useTemporaryWorkoutStore(state => state.setWorkout)
	// Функция для выдачи достижения пользователя
	const unlockAchievement = useUserStore(state => state.unlockAchievement)

	// Функция для изменения состояния модального окна с подробной информацией об упражнении
	const setAboutExercise = useModalsStore(state => state.setAboutExerciseTarget)

	// Выбранное упражнение
	const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>([])
	// Состояние отображения карточки для добавления упражнения в план тренировки
	const [showExerciseInput, setShowExerciseInput] = useState<boolean>(false)
	// Состояние сохранения тренировки (запуск без сохранение/сохранение)
	const [submitType, setSubmitType] = useState<"temp" | "save">("save")
	// Ошибка
	const [error, setError] = useState<string>("")

	// Хэлпер для получения начальных значений в зависимости от параметра
	const returnExerciseFields = (
		exercise: ExerciseType
	): WorkoutExerciseType["targetValue"] => {
		switch (exercise.parameter) {
			case "вес-время":
				if (user.weight && user.experienceLevel)
					return {
						weight: Math.round(user.weight * 0.25),
						time: user.experienceLevel === "продвинутый" ? 60 : 30
					}

				return { weight: 0, time: 0 }
			case "вес-повторения":
				if (user.weight && user.experienceLevel)
					return {
						weight: Math.round(user.weight * 0.25),
						repeats: user.experienceLevel === "продвинутый" ? 25 : 10
					}

				return { weight: 0, repeats: 0 }
			case "время":
				if (user.experienceLevel)
					return user.experienceLevel === "продвинутый" ? 150 : 60

				return 0
			case "повторения":
				if (user.experienceLevel)
					return user.experienceLevel === "продвинутый" ? 50 : 20

				return 0
		}
	}

	// Показать/скрыть форму добавления упражнения
	const toggleExerciseInput = (): void => {
		setShowExerciseInput(prev => !prev)
	}

	// Добавить упражнение в план тренировки
	const addExercise = (exercise: ExerciseType): void => {
		setSelectedExercises(prev => [...prev, exercise])
		append({
			id: exercise.id,
			parameter: exercise.parameter,
			targetValue: returnExerciseFields(exercise),
			breakTime: 0
		})

		setShowExerciseInput(false)
	}

	// Удалить упражнение из плана тренировки
	const removeExercise = (index: number): void => {
		setSelectedExercises(prev => prev.filter((_, i) => i !== index))
		remove(index)
	}

	// Полный сброс формы
	const resetForm = (): void => {
		reset()
		setSelectedExercises([])
	}

	// Хук для работы с формой создания новой тренировки
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<WorkoutType>({
		mode: "onChange"
	})

	// Хук для работы с полями упражнений из плана тренировки
	const { fields, append, remove } = useFieldArray({
		control,
		name: "exercises"
	})

	// Обработчик события submit у формы создания новой тренировки
	const saveWorkout: SubmitHandler<WorkoutType> = data => {
		if (data.exercises.length < 2) return

		unlockAchievement("aid-3") // Достижение "КаСтоМиЗаЦиЯ"

		if (submitType === "save") {
			// Генерация уникального id
			let idNumber: number = workouts.length - 1

			do idNumber++
			while (workouts.find(workout => workout.id === `wid-${idNumber}`))

			// Сохранение тренировки
			addWorkout({
				id: `wid-${idNumber}`,
				title: data.title,
				description: data.description,
				exercises: data.exercises
			})

			// Редирект на страницу тренировок
			navigate(NavigationEnum.WORKOUTS)
		} else {
			// Сохранение тренировки в специальное временное хранилище
			setTempWorkout({
				id: "temp-workout",
				title: data.title,
				description: data.description,
				exercises: data.exercises
			})

			// Запуск тренировки
			navigate(NavigationEnum.WORKOUT + "temp-workout")
		}
	}

	// Вывод ошибки о минимальном кол-ве упражнений в плане тренировки
	useEffect(() => {
		if (selectedExercises.length < 2)
			setError("План тренировки должен содержать как минимум 2 упражнения")
		else setError("")
	}, [selectedExercises])

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Создание тренировки</Heading>

				{(!user.experienceLevel || !user.weight) && (
					<div className={styles.reminder}>
						<p className={styles.warning}>
							Вы ещё не указали свои параметры, из-за чего цели упражнений не
							будут подбираться автоматически.
						</p>
						<p className={styles.hint}>
							Указать свои параметры вы можете на{" "}
							<button onClick={() => navigate(NavigationEnum.AVATAR)}>
								странице персонажа
							</button>
						</p>
					</div>
				)}

				<form onSubmit={handleSubmit(saveWorkout)} className={styles.form}>
					<Label htmlFor="title-input">Название:</Label>
					<Input
						{...register("title", {
							minLength: {
								value: 4,
								message: "Недопустимая длинна: не менее 4 символов"
							},
							maxLength: {
								value: 36,
								message: "Недопустимая длинна: не более 36 символов"
							},
							required: {
								value: true,
								message: "Поле является обязательным"
							}
						})}
						type="text"
						id="title-input"
						placeholder="Введите название"
					/>
					{errors.title && (
						<p className={styles.error}>{errors.title.message}</p>
					)}

					<Label htmlFor="description-input">Описание:</Label>
					<textarea
						{...register("description", {
							maxLength: {
								value: 135,
								message: "Недопустимая длинна: не более 135 символов"
							}
						})}
						className={styles.description}
						id="description-input"
						placeholder="Введите описание (необязательно)"
					></textarea>
					{errors.description && (
						<p className={styles.error}>{errors.description.message}</p>
					)}

					<h3 className={styles.label}>План тренировки:</h3>
					<div className={styles.exercises}>
						{/* Список добавленных упражнений */}
						{selectedExercises.length > 0 && (
							<>
								<ul className={styles.stages}>
									{fields.map((exercise, index) => (
										<li
											className={styles.stage}
											key={`${exercise.id}-${index}`}
										>
											<div className={styles["stage-content"]}>
												<div className={styles.stage__fields}>
													<button
														onClick={() =>
															setAboutExercise(selectedExercises[index].id)
														}
														className={styles.stage__title}
														type="button"
														title="Узнать больше об упражнении"
													>
														{selectedExercises[index].title}
													</button>

													{exercise.parameter === "вес-время" && (
														<>
															<Label
																htmlFor={`${exercise.id}-${index}-weight-input`}
															>
																Вес:
															</Label>
															<UnderlinedInput
																{...register(
																	`exercises.${index}.targetValue.weight`,
																	{
																		required: {
																			value: true,
																			message:
																				'Поле "Вес" является обязательным'
																		},
																		valueAsNumber: true,
																		validate: value => {
																			if (isNaN(value))
																				return "Некорректный формат: введите целое или десятичное число"
																			if (value < 0.1)
																				return "Некорректные данные: вес должен превышать 0.1 кг"
																			if (value > 150)
																				return "Слишком высокая нагрузка: вес не должен превышать 150 кг"
																		}
																	}
																)}
																type="text"
																id={`${exercise.id}-${index}-weight-input`}
																placeholder="Килограммы"
															/>

															<Label
																htmlFor={`${exercise.id}-${index}-time-input`}
															>
																Время выполнения:
															</Label>
															<UnderlinedInput
																{...register(
																	`exercises.${index}.targetValue.time`,
																	{
																		required: {
																			value: true,
																			message:
																				'Поле "Время выполнения" является обязательным'
																		},
																		valueAsNumber: true,
																		min: {
																			value: 5,
																			message:
																				"Некорректные данные: время выполнения должно быть не меньше 5 секунд"
																		},
																		max: {
																			value: 1800,
																			message:
																				"Слишком высокая нагрузка: время выполнения должно быть не больше 1800 секунд"
																		}
																	}
																)}
																type="number"
																id={`${exercise.id}-${index}-time-input`}
																placeholder="Секунды"
															/>
														</>
													)}

													{exercise.parameter === "вес-повторения" && (
														<>
															<Label
																htmlFor={`${exercise.id}-${index}-weight-input`}
															>
																Вес:
															</Label>
															<UnderlinedInput
																{...register(
																	`exercises.${index}.targetValue.weight`,
																	{
																		required: {
																			value: true,
																			message:
																				'Поле "Вес" является обязательным'
																		},
																		valueAsNumber: true,
																		validate: value => {
																			if (isNaN(value))
																				return "Некорректный формат: введите целое или десятичное число"
																			if (value < 0.1)
																				return "Некорректные данные: вес должен превышать 0.1 кг"
																			if (value > 150)
																				return "Слишком высокая нагрузка: вес не должен превышать 150 кг"
																		}
																	}
																)}
																type="text"
																id={`${exercise.id}-${index}-weight-input`}
																placeholder="Килограммы"
															/>

															<Label
																htmlFor={`${exercise.id}-${index}-repeats-input`}
															>
																Кол-во повторений:
															</Label>
															<UnderlinedInput
																{...register(
																	`exercises.${index}.targetValue.repeats`,
																	{
																		required: {
																			value: true,
																			message:
																				'Поле "Кол-во повторений" является обязательным'
																		},
																		valueAsNumber: true,
																		min: {
																			value: 1,
																			message:
																				"Некорректные данные: кол-во повторений должно быть не меньше 1"
																		},
																		max: {
																			value: 300,
																			message:
																				"Слишком высокая нагрузка: кол-во повторений должно быть не больше 300"
																		}
																	}
																)}
																type="number"
																id={`${exercise.id}-${index}-repeats-input`}
																placeholder="Кол-во повторений"
															/>
														</>
													)}

													{exercise.parameter === "время" && (
														<>
															<Label
																htmlFor={`${exercise.id}-${index}-time-input`}
															>
																Время выполнения:
															</Label>
															<UnderlinedInput
																{...register(`exercises.${index}.targetValue`, {
																	required: {
																		value: true,
																		message:
																			'Поле "Время выполнения" является обязательным'
																	},
																	valueAsNumber: true,
																	min: {
																		value: 5,
																		message:
																			"Некорректные данные: время выполнения должно быть не меньше 5 секунд"
																	},
																	max: {
																		value: 1800,
																		message:
																			"Слишком высокая нагрузка: время выполнения должно быть не больше 1800 секунд"
																	}
																})}
																type="number"
																id={`${exercise.id}-${index}-time-input`}
																placeholder="Секунды"
															/>
														</>
													)}

													{exercise.parameter === "повторения" && (
														<>
															<Label
																htmlFor={`${exercise.id}-${index}-repeats-input`}
															>
																Кол-во повторений:
															</Label>
															<UnderlinedInput
																{...register(`exercises.${index}.targetValue`, {
																	required: {
																		value: true,
																		message:
																			'Поле "Кол-во повторений" является обязательным'
																	},
																	valueAsNumber: true,
																	min: {
																		value: 1,
																		message:
																			"Некорректные данные: кол-во повторений должно быть не меньше 1"
																	},
																	max: {
																		value: 300,
																		message:
																			"Слишком высокая нагрузка: кол-во повторений должно быть не больше 300"
																	}
																})}
																type="number"
																id={`${exercise.id}-${index}-repeats-input`}
																placeholder="Кол-во повторений"
															/>
														</>
													)}

													{index < selectedExercises.length - 1 && (
														<>
															<Label
																htmlFor={`${exercise.id}-${index}-break-input`}
															>
																Перерыв после упражнения:
															</Label>
															<UnderlinedInput
																{...register(`exercises.${index}.breakTime`, {
																	required: {
																		value: true,
																		message:
																			'Поле "Перерыв после упражнения" является обязательным'
																	},
																	valueAsNumber: true,
																	min: {
																		value: 5,
																		message:
																			"Некорректные данные: перерыв должен длиться не менее 5 секунд"
																	},
																	max: {
																		value: 1800,
																		message:
																			"Некорректные данные: перерыв не может превышать 1800 секунд"
																	}
																})}
																type="number"
																id={`${exercise.id}-${index}-break-input`}
																placeholder="Секунды"
															/>
														</>
													)}
												</div>

												<OutlinedButton
													onClick={() => removeExercise(index)}
													className={styles.stage__btn}
												>
													<Delete />
												</OutlinedButton>
											</div>

											<div className={styles["stage-errors"]}>
												{errors.exercises?.[index]?.targetValue &&
													(typeof errors.exercises[index].targetValue ===
														"object" &&
													!(
														"message" in errors.exercises[index].targetValue
													) ? (
														Object.entries(
															errors.exercises[index].targetValue
														).map(([key, error]) => (
															<p key={key}>
																{(error as { message: string })?.message}
															</p>
														))
													) : (
														<p>
															{
																(
																	errors.exercises[index].targetValue as {
																		message: string
																	}
																)?.message
															}
														</p>
													))}

												{errors.exercises?.[index]?.breakTime && (
													<p>{errors.exercises[index].breakTime.message}</p>
												)}
											</div>
										</li>
									))}
								</ul>

								<hr className={styles.separator} />
							</>
						)}

						{/* Форма поиска упражнения */}
						{showExerciseInput && <ExerciseInput action={addExercise} />}

						{/* Кнопка показа поисковика упражнения */}
						<OutlinedButton
							type="button"
							onClick={toggleExerciseInput}
							className={styles["add_exercise-btn"]}
						>
							{showExerciseInput ? <Remove /> : <Add />}
						</OutlinedButton>
					</div>

					{error && <p className={styles["global-error"]}>{error}</p>}

					<div className={styles["submit-buttons"]}>
						<Button onClick={() => setSubmitType("save")} type="submit">
							Сохранить
						</Button>
						<Button onClick={() => setSubmitType("temp")} type="submit">
							Запустить без сохранения
						</Button>
					</div>

					<OutlinedButton
						onClick={resetForm}
						className={styles["reset-btn"]}
						type="button"
					>
						Сбросить
					</OutlinedButton>
				</form>
			</div>
		</PageTransitionLayout>
	)
}
