import { useState, type ChangeEvent, type Dispatch } from "react"

import { Button, Input, OutlinedButton } from "@/components/ui"

import styles from "./InstructionForm.module.scss"

interface IProps {
	stages: string[]
	setStages: Dispatch<string[]>
}

export default function InstructionForm({ stages, setStages }: IProps) {
	// Значение поля ввода этапа инструкции
	const [inputValue, setInputValue] = useState<string>("")
	// Ошибка
	const [error, setError] = useState<string>("")

	// Обработка события изменения значения поля ввода этапа инструкции
	const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(evt.target.value)
		setError("")
	}

	// Функция для добавления этапа в инструкцию
	const addStage = (): void => {
		if (inputValue.trim().length <= 3) return setError("Недопустимая длинна")

		setStages([...stages, inputValue.trim()])
		setInputValue("")
		setError("")
	}

	// Функция для удаления этапа инструкции
	const removeStage = (stageIndex: number): void => {
		setStages(stages.filter((_, index) => index !== stageIndex))
	}

	return (
		<div className={styles.instruction}>
			<ol className={styles.list}>
				{stages.length > 0 ? (
					stages.map((stage, index) => (
						<li className={styles.stage} key={`stage-${index}`}>
							{stage}
						</li>
					))
				) : (
					<span className={styles["no-content"]}>Пусто...</span>
				)}
			</ol>

			<div className={styles.form}>
				<Input
					value={inputValue}
					onChange={onInputChange}
					type="text"
					placeholder="Введите текст этапа"
					name="instruction_stage-input"
				/>

				<Button onClick={addStage} className={styles.button} type="button">
					Добавить
				</Button>

				<OutlinedButton
					onClick={() => removeStage(stages.length - 1)}
					className={styles.button}
					type="button"
				>
					Удалить
				</OutlinedButton>
			</div>

			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}
