import AddCircleIcon from "@mui/icons-material/AddCircle"
import TurnLeftIcon from "@mui/icons-material/TurnLeft"
import { useState } from "react"

import PageTransitionLayout from "@/components/layouts/PageTransitionLayout"
import { ExerciseCard, FiltersPanel } from "@/components/screens/Exercises"
import { Heading } from "@/components/ui"
import { useModalsStore } from "@/store/modalsStore"
import type { ExerciseType } from "@/types/exercise.type"

import styles from "./Exercises.module.scss"

export default function Exercises() {
	// Функция для изменения состояния модального окна создания нового упражнения
	const setModalState = useModalsStore(state => state.setNewExerciseModalState)

	// Список упражнений (отфильтрованный)
	const [exercises, setExercises] = useState<ExerciseType[]>()

	return (
		<PageTransitionLayout>
			<div className={styles.page}>
				<Heading>Каталог упражнений</Heading>

				<FiltersPanel setExercises={setExercises} />

				{exercises ? (
					exercises.length > 0 ? (
						<>
							<div className={styles["cards-container"]}>
								{exercises.map(exercise => (
									<ExerciseCard data={exercise} key={exercise.id} />
								))}
							</div>

							<button
								onClick={() => setModalState(true)}
								className={styles["new_exercise-btn"]}
								title="Добавить новое упражнение"
							>
								<AddCircleIcon />
							</button>

							<p className={styles["bottom-hint"]}>
								<span>Не нашли нужное упражнение? Добавьте</span>{" "}
								<TurnLeftIcon />
							</p>
						</>
					) : (
						<div className={styles["no-content"]}>
							<h3 className={styles["no-content__heading"]}>Пусто...</h3>
							<p className={styles["no-content__hint"]}>Сбросьте фильтры</p>
							<p className={styles["no-content__hint"]}>
								или{" "}
								<button
									onClick={() => setModalState(true)}
									className={styles["no-content__button"]}
								>
									добавьте новые упражнения
								</button>
							</p>
						</div>
					)
				) : (
					<div className={styles["no-content"]}>
						<h3 className={styles["no-content__heading"]}>Загрузка...</h3>
					</div>
				)}
			</div>
		</PageTransitionLayout>
	)
}
