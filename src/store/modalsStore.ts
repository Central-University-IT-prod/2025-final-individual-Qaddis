import { create } from "zustand"

import type { ExerciseType } from "@/types/exercise.type"

interface ModalsStore {
	mobileNavModalState: boolean
	setMobileNavModalState: (value: boolean) => void

	aboutExerciseTarget: ExerciseType["id"] | "none"
	setAboutExerciseTarget: (value: ExerciseType["id"] | "none") => void

	newExerciseModalState: boolean
	setNewExerciseModalState: (value: boolean) => void

	confirmResetModalState: boolean
	setConfirmResetModalState: (value: boolean) => void
}

export const useModalsStore = create<ModalsStore>(set => ({
	// Модальное окно с навигацией для мобильных устройств
	mobileNavModalState: false,
	setMobileNavModalState: value => set({ mobileNavModalState: value }),

	// Модальное окно с подробной информацией об упражнении
	aboutExerciseTarget: "none",
	setAboutExerciseTarget: value => set({ aboutExerciseTarget: value }),

	// Модальное окно создания нового упражнения
	newExerciseModalState: false,
	setNewExerciseModalState: value => set({ newExerciseModalState: value }),

	// Модальное окно подтверждения сброса
	confirmResetModalState: false,
	setConfirmResetModalState: value => set({ confirmResetModalState: value })
}))
