import DeleteIcon from "@mui/icons-material/Delete"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"

import { Button } from "@/components/ui"
import { useExerciseStore } from "@/store/exercisesStore"
import { useModalsStore } from "@/store/modalsStore"
import type { ExerciseType } from "@/types/exercise.type"

import styles from "./ExerciseCard.module.scss"

interface IProps {
	data: ExerciseType
}

export default function ExerciseCard({ data }: IProps) {
	// Функция для удаления упражнения
	const removeExercise = useExerciseStore(state => state.removeExercise)
	// Функция для изменения состояния модального окна с подробной информацией об упражнении
	const setAboutExercise = useModalsStore(state => state.setAboutExerciseTarget)

	return (
		<article className={styles.card}>
			<h3 className={styles.title}>{data.title}</h3>

			<div className={styles.special}>
				<div className={styles.difficulty}>
					<LocalFireDepartmentIcon className={styles.difficulty__icon} />
					<span className={styles.difficulty__value}>{data.difficulty}</span>
				</div>
			</div>

			<p className={styles.description}>{data.description}</p>

			<ul className={styles.tags}>
				{data.tags.map((tag, index) => (
					<li className={styles.tag} key={`${data.id}-tag${index}`}>
						{tag}
					</li>
				))}
			</ul>

			<div className={styles.buttons}>
				<Button
					onClick={() => setAboutExercise(data.id)}
					title="Подробнее о упражнении"
				>
					Подробнее
				</Button>
				<Button
					onClick={() => removeExercise(data.id)}
					title="Удалить упражнение"
				>
					<DeleteIcon className={styles.delete_icons} />
				</Button>
			</div>
		</article>
	)
}
