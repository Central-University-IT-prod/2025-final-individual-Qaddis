import {
	type ChangeEvent,
	type Dispatch,
	type MouseEvent,
	useEffect,
	useState
} from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import { Button, Label, OutlinedButton, UnderlinedInput } from "@/components/ui"
import { useExerciseStore } from "@/store/exercisesStore"
import type { ExerciseType } from "@/types/exercise.type"
import { SearchInput } from "../SearchField"

import styles from "./FiltersPanel.module.scss"

interface IProps {
	setExercises: Dispatch<ExerciseType[]>
}

type DifficultyChangeFnType = (
	evt: ChangeEvent<HTMLInputElement>,
	targetFn: (value: number) => void
) => void

interface IFiltersForm {
	minDifficulty: number
	maxDifficulty: number
	searchTitle: string
}

export default function FiltersPanel({ setExercises }: IProps) {
	// Список всех упражнений
	const exercises = useExerciseStore(state => state.exercises)

	// Тэг, по которому будет вестись поиск
	const [searchTag, setSearchTag] = useState<string>("")
	// Оборудование, по которому будет вестись поиск
	const [searchEquip, setSearchEquip] = useState<string>("")

	// Минимальная и максимальная сложности, которые будут найдены
	const [minDifficultyValue, setMinDifficultyValue] = useState<number>(1)
	const [maxDifficultyValue, setMaxDifficultyValue] = useState<number>(10)

	// Обработчик события изменения значения поля ввода сложности
	const onDifficultyChange: DifficultyChangeFnType = (evt, targetFn): void => {
		targetFn(+evt.target.value)
	}

	// Хук для работы с формой фильтров
	const { register, handleSubmit, reset, formState } = useForm<IFiltersForm>()

	// Фильтрация по тегам
	const filterTags = (
		data: ExerciseType[],
		searchTag: string
	): ExerciseType[] => {
		if (!searchTag.trim()) return data

		return data.filter(({ tags }) =>
			tags.some(tag => tag.includes(searchTag.trim().toLowerCase()))
		)
	}

	// Фильтрация по оборудованию
	const filterEquipment = (
		data: ExerciseType[],
		searchTag: string
	): ExerciseType[] => {
		const processedTag: string = searchTag.trim().toLowerCase()

		if (!processedTag) return data

		if (processedTag === "без оборудования") {
			const filteredData: ExerciseType[] = []

			data.forEach(exercise => {
				if (exercise.equipment.length === 0) filteredData.push(exercise)

				if (
					exercise.equipment.some(equip =>
						equip.includes(searchTag.trim().toLowerCase())
					)
				)
					filteredData.push(exercise)
			})

			return filteredData
		}

		return data.filter(({ equipment }) =>
			equipment.some(equip => equip.includes(processedTag))
		)
	}

	// Фильтрация по сложности
	const filterDifficulty = (
		data: ExerciseType[],
		minValue: number,
		maxValue: number
	): ExerciseType[] => {
		let processData: ExerciseType[] = data

		if (minValue)
			processData = processData.filter(
				exercise => exercise.difficulty >= minValue
			)

		if (maxValue)
			processData = processData.filter(
				exercise => exercise.difficulty <= maxValue
			)

		return processData
	}

	// Обработчик события submit у формы фильтров
	const submitHandler: SubmitHandler<IFiltersForm> = data => {
		let processData: ExerciseType[] = exercises

		if (data.searchTitle.trim())
			processData = processData.filter(exercises =>
				exercises.title
					.toLowerCase()
					.includes(data.searchTitle.trim().toLowerCase())
			)

		if (processData.length > 0) processData = filterTags(processData, searchTag)

		if (processData.length > 0)
			processData = filterEquipment(processData, searchEquip)

		if (processData.length > 0)
			processData = filterDifficulty(
				processData,
				+data.minDifficulty,
				+data.maxDifficulty
			)

		setExercises(processData)
	}

	// Функция для сброса формы фильтров
	const resetForm = (evt: MouseEvent<HTMLButtonElement>): void => {
		evt.preventDefault()

		reset()
		setSearchEquip("")
		setSearchTag("")

		setExercises(exercises)
	}

	// Применение установленных фильтров при каждом обновлении списка упражнений
	useEffect(() => {
		handleSubmit(submitHandler)()
	}, [exercises])

	return (
		<aside className={styles.panel}>
			<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
				<div className={styles.fields}>
					<div className={styles.row}>
						<UnderlinedInput
							{...register("searchTitle")}
							type="text"
							id="title-search"
							placeholder="Поиск по названию"
						/>

						<SearchInput
							text="Поиск по тегу"
							type="tags"
							fieldValue={searchTag}
							setFieldValue={setSearchTag}
							allTags={exercises.flatMap(({ tags }) => tags.map(tag => tag))}
						/>

						<SearchInput
							text="Поиск по оборудованию"
							fieldValue={searchEquip}
							setFieldValue={setSearchEquip}
							type="equipment"
							allTags={exercises.flatMap(({ equipment }) =>
								equipment.map(equip => equip)
							)}
						/>
					</div>

					<div className={styles.row}>
						<Label htmlFor="min-difficulty-input">Сложность:</Label>

						<UnderlinedInput
							{...register("minDifficulty", {
								valueAsNumber: false,
								min: {
									value: 1,
									message: "Недопустимое значение: не меньше 1"
								},
								max: {
									value: maxDifficultyValue - 1,
									message:
										"Недопустимое значение: значение должно быть меньше максимального"
								}
							})}
							className={styles["number-field"]}
							onChange={evt => onDifficultyChange(evt, setMinDifficultyValue)}
							type="number"
							placeholder="От"
							id="min-difficulty-input"
						/>

						<UnderlinedInput
							{...register("maxDifficulty", {
								valueAsNumber: false,
								min: {
									value: minDifficultyValue + 1,
									message:
										"Недопустимое значение: значение должно быть больше минимального"
								},
								max: {
									value: 10,
									message: "Недопустимое значение: не больше 10"
								}
							})}
							className={styles["number-field"]}
							onChange={evt => onDifficultyChange(evt, setMaxDifficultyValue)}
							type="number"
							placeholder="До"
							id="max-difficulty-input"
						/>
					</div>
				</div>

				<div className={styles.buttons}>
					<Button type="submit">Поиск</Button>
					<OutlinedButton onClick={resetForm} type="reset">
						Очистить
					</OutlinedButton>
				</div>
			</form>

			{formState.errors.minDifficulty && (
				<p className={styles["filter-error"]}>
					{formState.errors.minDifficulty.message}
				</p>
			)}

			{formState.errors.maxDifficulty && (
				<p className={styles["filter-error"]}>
					{formState.errors.maxDifficulty.message}
				</p>
			)}
		</aside>
	)
}
