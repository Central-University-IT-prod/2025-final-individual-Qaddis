import type { AchievementType } from "@/types/achievement.type"

export const achievements: AchievementType[] = [
	{
		id: "aid-1",
		title: "На кончике пера",
		description: "Укажите свои данные",
		image: "OnThePen.webp",
		reward: 10
	},
	{
		id: "aid-2",
		title: "Больше активности!",
		description: "Добавьте упражнение",
		image: "MoreActivity.webp",
		reward: 10
	},
	{
		id: "aid-3",
		title: "КаСтОмИзАцИя",
		description: "Создайте собственную тренировку",
		image: "Customization.webp",
		reward: 10
	},
	{
		id: "aid-4",
		title: "Ленивый",
		description: "Пропустите этап тренировки",
		image: "Lazy.webp",
		reward: 10
	},
	{
		id: "aid-5",
		title: "Ни секунды на отдых",
		description: "Пропустите перерыв",
		image: "NoRest.webp",
		reward: 10
	},
	{
		id: "aid-6",
		title: "Спортсмен",
		description: "Полностью пройдите одну тренировку",
		image: "Athlete.webp",
		reward: 15
	},
	{
		id: "aid-7",
		title: "С чистого листа",
		description: "Сбросьте пользовательские данные",
		image: "ClearPaper.webp",
		reward: 15
	},
	{
		id: "aid-8",
		title: "Модный",
		description: "Купите элемент кастомизации аватара",
		image: "Fashionable.webp",
		reward: 15
	},
	{
		id: "aid-9",
		title: "Чемпион",
		description: "Достигните максимального уровня уровня",
		image: "Champion.webp",
		reward: 20
	}
]
