import { motion } from "motion/react"
import type { PropsWithChildren } from "react"

export default function PageTransitionLayout({ children }: PropsWithChildren) {
	return (
		<motion.div
			style={{ width: "100%", height: "100%" }}
			initial={{ opacity: 0, transition: { delay: 0.3 } }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 1 }}
			transition={{ duration: 0.25, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	)
}
