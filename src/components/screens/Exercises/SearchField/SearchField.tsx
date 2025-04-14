import { useEffect, useState, type ChangeEvent, type Dispatch } from "react"

import { UnderlinedInput } from "@/components/ui"

import styles from "./SearchField.module.scss"

interface IProps {
	fieldValue: string
	setFieldValue: Dispatch<string>
	text: string
	allTags: string[]
	type: "equipment" | "tags"
}

export default function SearchField({
	fieldValue,
	setFieldValue,
	text,
	allTags,
	type
}: IProps) {
	// Список подсказок
	const [hintsList, setHintsList] = useState<string[]>([])
	// Состояние фокуса на поле ввода
	const [fieldInFocus, setFieldInFocus] = useState<boolean>(false)

	// Обработка изменения значения поля ввода
	const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
		setFieldValue(evt.target.value)
	}

	// Обновление списка подсказок при изменении значения поля ввода
	useEffect(() => {
		if (fieldValue.trim().length > 0) {
			const tagsSet = new Set<string>()

			allTags.forEach(tag => tagsSet.add(tag))

			const availableTagsList: string[] = Array.from(tagsSet)

			if (
				!availableTagsList.includes("без оборудования") &&
				type === "equipment"
			)
				availableTagsList.push("без оборудования")

			setHintsList(
				availableTagsList.filter(tag =>
					tag.includes(fieldValue.trim().toLowerCase())
				)
			)
		} else setHintsList([])
	}, [fieldValue, allTags])

	return (
		<div className={styles["field-with-hint"]}>
			<UnderlinedInput
				onFocus={() => setFieldInFocus(true)}
				onBlur={() => setFieldInFocus(false)}
				onChange={onInputChange}
				value={fieldValue}
				className={styles["text-field"]}
				type="text"
				id={`${type}-search`}
				placeholder={text}
			/>

			{fieldInFocus && hintsList.length > 0 && (
				<ul className={styles["hints-list"]}>
					{hintsList.map((hint, index) => (
						<li className={styles.hint} key={`${type}-${index}`}>
							<button
								onClick={() => setFieldValue(hint)}
								onMouseDown={e => e.preventDefault()}
								className={styles.hint__btn}
								type="button"
							>
								{hint}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
