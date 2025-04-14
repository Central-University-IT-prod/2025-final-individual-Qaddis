import { AnimatePresence } from "motion/react"
import { Route, Routes, useLocation } from "react-router"

import AppFooter from "./components/AppFooter"
import AppHeader from "./components/AppHeader"
import AppSidebar from "./components/AppSidebar"
import {
	AboutExerciseModal,
	ConfirmResetModal,
	MobileNavModal,
	NewExerciseModal
} from "./components/modals"
import { NavigationEnum } from "./constants/navigation"
import {
	AchievementsPage,
	AvatarPage,
	ExercisesPage,
	HomePage,
	NewWorkoutPage,
	NotFoundPage,
	WorkoutPage,
	WorkoutsPage
} from "./pages"

export default function App() {
	const location = useLocation()

	return (
		<>
			{/* Шапка (для небольших экранов) */}
			<AppHeader />

			<main className="main">
				<div className="wrapper">
					{/* Сайдбар (для больших экранов) */}
					<AppSidebar />

					<section className="content">
						<AnimatePresence>
							<Routes location={location} key={location.key}>
								{/* Главная страница */}
								<Route path={NavigationEnum.HOME} element={<HomePage />} />

								{/* Каталог упражнений */}
								<Route
									path={NavigationEnum.EXERCISES}
									element={<ExercisesPage />}
								/>

								{/* Список всех тренировок */}
								<Route
									path={NavigationEnum.WORKOUTS}
									element={<WorkoutsPage />}
								/>

								{/* Создание новой тренировки */}
								<Route
									path={NavigationEnum.NEW_WORKOUT}
									element={<NewWorkoutPage />}
								/>

								{/* Запуск тренировки */}
								<Route
									path={NavigationEnum.WORKOUT + ":trainingId"}
									element={<WorkoutPage />}
								/>

								{/* Аватар пользователя и косметика */}
								<Route path={NavigationEnum.AVATAR} element={<AvatarPage />} />

								{/* Достижения */}
								<Route
									path={NavigationEnum.ACHIEVEMENTS}
									element={<AchievementsPage />}
								/>

								{/* Страница 404 */}
								<Route path="*" element={<NotFoundPage />} />
							</Routes>
						</AnimatePresence>
					</section>
				</div>
			</main>

			{/* Модальные окна */}
			<AnimatePresence>
				{/* Модальное окно для навигации на мобильных */}
				<MobileNavModal key={"mobile-nav-modal"} />

				{/* Модальное окно с подробной информацией об упражнении */}
				<AboutExerciseModal key={"about-modal"} />

				{/* Модальное окно с формой добавления нового упражнения */}
				<NewExerciseModal key={"new-exercise-modal"} />

				{/* Подтверждение сброса данных пользователя */}
				<ConfirmResetModal key={"confirm-reset-modal"} />
			</AnimatePresence>

			<AppFooter />
		</>
	)
}
