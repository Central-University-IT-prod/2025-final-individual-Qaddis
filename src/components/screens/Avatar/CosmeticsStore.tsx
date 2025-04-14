import PaidIcon from "@mui/icons-material/Paid"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui"
import { avatarBackgrounds, avatarFrames } from "@/data/cosmetics"
import { useUserStore } from "@/store/userStore"
import type { CosmeticsType } from "@/types/cosmetics.type"

import styles from "./CosmeticsStore.module.scss"

interface IGoods {
	purchased: CosmeticsType[]
	notPurchased: CosmeticsType[]
}

export default function CosmeticsStore() {
	// Объект с данными пользователя
	const user = useUserStore(state => state.user)
	// Функция для "экипировки" предмета кастомизации
	const equipItem = useUserStore(state => state.equipCosmetic)
	// Функция для покупки предмета кастомизации
	const purchaseItem = useUserStore(state => state.buyCosmetic)

	// Активная вкладка магазина косметики
	const [activeSection, setActiveSection] =
		useState<CosmeticsType["type"]>("background")

	// Объект со списками товаров (фоны аватар и рамки аватара)
	const goods = useMemo<IGoods>(() => {
		const purchased: CosmeticsType[] = []
		const notPurchased: CosmeticsType[] = []

		if (activeSection === "background") {
			avatarBackgrounds.forEach(bg => {
				if (user.unlockedBackgrounds.includes(bg.id)) purchased.push(bg)
				else notPurchased.push(bg)
			})
		} else {
			avatarFrames.forEach(frame => {
				if (user.unlockedFrames.includes(frame.id)) purchased.push(frame)
				else notPurchased.push(frame)
			})
		}

		return { purchased, notPurchased }
	}, [activeSection, user.unlockedBackgrounds, user.unlockedFrames])

	return (
		<section className={styles.store}>
			<div className={styles.info}>
				<h3 className={styles.heading}>Украшения карточки аватара</h3>

				<p className={styles.balance}>
					Баланс: <PaidIcon /> <span>{user.coins}</span>
				</p>
			</div>

			<div className={styles.tabs}>
				<button
					onClick={() => setActiveSection("background")}
					className={
						activeSection === "background"
							? `${styles["sect-tab"]} ${styles.active}`
							: styles["sect-tab"]
					}
				>
					Фоны
				</button>
				<button
					onClick={() => setActiveSection("frame")}
					className={
						activeSection === "frame"
							? `${styles["sect-tab"]} ${styles.active}`
							: styles["sect-tab"]
					}
				>
					Рамки
				</button>
			</div>

			<div className={styles.goods}>
				{goods.purchased.map(item => (
					<article className={styles["purchased-item"]} key={item.id}>
						<h4>{item.title}</h4>

						{[user.selectedBackground, user.selectedFrame].includes(item.id) ? (
							<Button disabled>Используется</Button>
						) : (
							<Button onClick={() => equipItem(item)}>Использовать</Button>
						)}
					</article>
				))}

				{goods.notPurchased.map(item => (
					<article className={styles.product} key={item.id}>
						<h4 className={styles.product__title}>{item.title}</h4>

						<p className={styles.product__price}>
							Цена: <PaidIcon /> <span>{item.price}</span>
						</p>

						{user.coins >= item.price ? (
							<Button onClick={() => purchaseItem(item)}>Купить</Button>
						) : (
							<Button disabled>Не хватает монет</Button>
						)}
					</article>
				))}
			</div>
		</section>
	)
}
