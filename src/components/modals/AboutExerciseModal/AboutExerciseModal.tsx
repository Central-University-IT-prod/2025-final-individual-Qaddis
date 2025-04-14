import { Delete, LocalFireDepartment, YouTube } from "@mui/icons-material"
import { useEffect } from "react"

import { useExerciseStore } from "@/store/exercisesStore"
import { useModalsStore } from "@/store/modalsStore"
import type { ExerciseType } from "@/types/exercise.type"
import { togglePageScroll } from "@/utils/togglePageScroll"
import ModalLayout from "../../layouts/ModalLayout"

import styles from "./AboutExerciseModal.module.scss"

export default function AboutExerciseModal() {
	// Состояние модального окна
	const targetExercise = useModalsStore(state => state.aboutExerciseTarget)
	// Функция для изменения состояния модального окна
	const setTargetExercise = useModalsStore(
		state => state.setAboutExerciseTarget
	)

	// Упражнение, о котором пользователь решил узнать подробнее
	const exercise = useExerciseStore(state =>
		state.exercises.find(item => item.id === targetExercise)
	)!
	// Функция для удаления упражнения
	const removeExercise = useExerciseStore(state => state.removeExercise)

	// Включение/отключение скролла на странице при закрытии/открытии модалки
	useEffect(() => {
		if (targetExercise === "none") togglePageScroll("enable")
		else togglePageScroll("disable")
	}, [targetExercise])

	// Функция для закрытия модального окна и удаления упражнения
	const deleteExercise = (id: ExerciseType["id"]): void => {
		setTargetExercise("none")
		removeExercise(id)
	}

	return (
		targetExercise !== "none" && (
			<ModalLayout closeModal={() => setTargetExercise("none")}>
				<section
					onClick={evt => evt.stopPropagation()}
					className={styles.modal}
				>
					<h2 className={styles.title}>{exercise.title}</h2>

					<div className={styles.difficulty}>
						<span className={styles.difficulty__label}>Сложность:</span>

						<LocalFireDepartment className={styles.difficulty__icon} />
						<span className={styles.difficulty__value}>
							{exercise.difficulty}
						</span>
					</div>

					<h3 className={styles.heading}>Тэги:</h3>
					<ul className={styles.tags}>
						{exercise.tags.map(tag => (
							<li className={styles.tag} key={`mtk-${tag}`}>
								{tag}
							</li>
						))}
					</ul>

					{exercise.equipment.length > 0 && (
						<>
							<h3 className={styles.heading}>Необходимое оборудование:</h3>
							<ul className={styles.equipment}>
								{exercise.equipment.map(item => (
									<li className={styles["equipment-item"]} key={`mek-${item}`}>
										{item}
									</li>
								))}
							</ul>
						</>
					)}

					<h3 className={styles.heading}>Описание:</h3>
					<p className={styles.description}>{exercise.description}</p>

					<h3 className={styles.heading}>Инструкция по выполнению:</h3>
					<ol className={styles.instruction}>
						{exercise.instruction.map((stage, index) => (
							<li className={styles.stage} key={`stage-${index}`}>
								{stage}
							</li>
						))}
					</ol>

					<div
						className={
							exercise.video
								? styles.row
								: `${styles.row} ${styles["one-child"]}`
						}
					>
						{exercise.video && (
							<a
								className={styles.video}
								href={exercise.video}
								target="_blank"
								title="Перейти к видеоинструкции"
							>
								<YouTube /> <span>Видеоинструкция</span>
							</a>
						)}
						<button
							onClick={() => deleteExercise(exercise.id)}
							className={styles["remove-btn"]}
							title="Удалить упражнение"
						>
							<Delete />
						</button>
					</div>
				</section>
			</ModalLayout>
		)
	)
}
