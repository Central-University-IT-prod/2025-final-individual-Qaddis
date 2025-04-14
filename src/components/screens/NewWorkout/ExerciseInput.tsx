import { type ChangeEvent, useEffect, useState } from "react"

import { Button, UnderlinedInput } from "@/components/ui"
import { useExerciseStore } from "@/store/exercisesStore"
import type { ExerciseType } from "@/types/exercise.type"

import styles from "./ExerciseInput.module.scss"

interface IProps {
	action: (exercise: ExerciseType) => void
}

export default function ExerciseInput({ action }: IProps) {
	// Список всех упражнений
	const exercises = useExerciseStore(state => state.exercises)

	// Выбранное упражнение
	const [selectedExercise, setSelectedExercise] = useState<ExerciseType>()
	// Список подсказок
	const [hints, setHints] = useState<ExerciseType[]>([])

	// Значение поля ввода упражнения
	const [inputValue, setInputValue] = useState<string>("")
	// Состояние фокуса на поле ввода упражнения
	const [inputInFocus, setInputInFocus] = useState<boolean>(false)
	// Ошибка
	const [error, setError] = useState<string>()

	// Обработка изменения значения поля ввода упражнения
	const changeInputValue = (evt: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(evt.target.value)
		setError("")
	}

	// Выбор упражнения (из списка подсказок)
	const selectExercise = (exercise: ExerciseType): void => {
		setInputValue(exercise.title)
		setSelectedExercise(exercise)
		setInputValue("")
	}

	// Добавление выбранного упражнения в план тренировки
	const saveChoice = (): void => {
		if (selectedExercise) action(selectedExercise)
		else setError("Выберите упражнение, которое хотите добавить")
	}

	// Изменения списка подсказок в зависимости от изменения значения поля ввода упражнения
	useEffect(() => {
		const value = inputValue.trim().toLowerCase()

		if (value.length > 0) {
			const hintsSet = new Set<ExerciseType>()

			exercises.forEach(exercise => {
				if (exercise.title.toLowerCase().includes(value)) hintsSet.add(exercise)

				exercise.tags.forEach(tag => {
					if (tag.includes(value)) hintsSet.add(exercise)
				})

				exercise.equipment.forEach(equip => {
					if (equip.includes(value)) hintsSet.add(exercise)
				})

				if (value === "без оборудования" && exercise.equipment.length === 0)
					hintsSet.add(exercise)
			})

			setHints(Array.from(hintsSet))
		} else setHints([])
	}, [inputValue, exercises])

	return (
		<article className={styles.card}>
			<div className={styles["exercise-search"]}>
				<UnderlinedInput
					className={styles.search}
					onFocus={() => setInputInFocus(true)}
					onBlur={() => setInputInFocus(false)}
					onChange={changeInputValue}
					value={inputValue}
					type="text"
					id="search-exercise-input"
					placeholder="Поиск по названию, тегу или оборудованию"
				/>

				{hints.length > 0 && inputInFocus && (
					<ul className={styles.hints}>
						{hints.map(hint => (
							<li className={styles.hint} key={`hint-${hint.id}`}>
								<button
									type="button"
									className={styles.hint__btn}
									onClick={() => selectExercise(hint)}
									onMouseDown={e => e.preventDefault()}
								>
									{hint.title}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{selectedExercise && (
				<p className={styles.choice}>
					Выбрано: <span>{selectedExercise.title}</span>
				</p>
			)}

			<Button onClick={saveChoice} className={styles["save-btn"]} type="button">
				Добавить
			</Button>

			{error && <p className={styles.error}>{error}</p>}
		</article>
	)
}
