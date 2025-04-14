import CloseIcon from "@mui/icons-material/Close"
import { useState, type ChangeEvent, type Dispatch } from "react"

import styles from "./TagsForm.module.scss"

interface IProps {
	tags: string[]
	setTags: Dispatch<string[]>
}

export default function TagsForm({ tags, setTags }: IProps) {
	// Значение поля ввода тэга
	const [inputValue, setInputValue] = useState<string>("")
	// Ошибка
	const [error, setError] = useState<string>()

	// Обработка изменения значения поля ввода тэга
	const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(evt.target.value)
		setError("")
	}

	// Функция добавления тега
	const addNewTag = (): void => {
		const processedValue: string = inputValue.trim().toLowerCase()

		if (processedValue.length <= 3 || processedValue.length > 24)
			return setError("Недопустимая длинна тега")

		if (tags.includes(processedValue))
			return setError("Данный тег уже добавлен")

		if (tags.length + 1 > 6) return setError("Слишком много тегов")

		setError("")
		setInputValue("")
		setTags([...tags, processedValue])
	}

	// Функция удаления тега
	const removeTag = (tagIndex: number): void => {
		setTags(tags.filter((_, index) => index !== tagIndex))
	}

	return (
		<div className={styles["tags-form"]}>
			<ul className={styles["tags-list"]}>
				{tags.length > 0 ? (
					tags.map((tag, index) => (
						<li className={styles.tag} key={tag + index}>
							<span className={styles.tag__name}>{tag}</span>

							<button
								className={styles.tag__btn}
								onClick={() => removeTag(index)}
							>
								<CloseIcon />
							</button>
						</li>
					))
				) : (
					<li className={styles["no-content"]}>Пусто...</li>
				)}
			</ul>

			<div className={styles.form}>
				<input
					className={styles.input}
					value={inputValue}
					onChange={onInputChange}
					type="text"
					placeholder="Введите название"
					name="tags-input"
				/>

				<button onClick={addNewTag} className={styles["add-btn"]} type="button">
					Добавить
				</button>
			</div>

			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}
