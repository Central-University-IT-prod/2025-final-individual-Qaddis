import CloseIcon from "@mui/icons-material/Close"
import { motion } from "motion/react"
import type { PropsWithChildren } from "react"

import styles from "./ModalLayout.module.scss"

type PropsType = {
	closeModal: () => void
} & PropsWithChildren

export default function ModalLayout({ children, closeModal }: PropsType) {
	return (
		<motion.div
			onClick={() => closeModal()}
			className={styles.overlay}
			initial="inactive"
			animate="active"
			exit="inactive"
			variants={{ inactive: { opacity: 0 }, active: { opacity: 1 } }}
			transition={{ duration: 0.25 }}
		>
			{children}

			<button onClick={closeModal} className={styles["close-btn"]}>
				<CloseIcon />
			</button>
		</motion.div>
	)
}
