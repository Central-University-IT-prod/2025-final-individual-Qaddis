import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui"
import styles from "./Timer.module.scss"

interface IProps {
	initTime: number
	onComplete: () => void
	canAdjust?: boolean
}

export default function Timer({
	initTime,
	onComplete,
	canAdjust = false
}: IProps) {
	// Оставшееся время
	const [timeLeft, setTimeLeft] = useState<number>(initTime)

	// Функционал таймера
	useEffect(() => {
		if (timeLeft <= 0) return onComplete()

		const interval = setInterval(() => {
			setTimeLeft(prev => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft])

	// Функция для изменения оставшегося времени
	const adjustTime = (delta: number): void => {
		setTimeLeft(prev => Math.max(prev + delta, 0))
	}

	return (
		<div className={styles.timer}>
			{timeLeft > 0 ? (
				<>
					<h4 className={styles.heading}>Осталось:</h4>

					<p className={styles["time-left"]}>{timeLeft}</p>

					<div className={styles["progress-bar"]}>
						<motion.div
							initial={false}
							animate={{
								width: `${Math.round((timeLeft / initTime) * 100)}%`
							}}
							className={styles.progress}
						></motion.div>
					</div>

					{canAdjust && (
						<div className={styles.buttons}>
							<Button onClick={() => adjustTime(-10)}>-10</Button>
							<Button onClick={() => adjustTime(10)}>+10</Button>
						</div>
					)}
				</>
			) : (
				<h4 className={styles.heading}>Время вышло!</h4>
			)}
		</div>
	)
}
