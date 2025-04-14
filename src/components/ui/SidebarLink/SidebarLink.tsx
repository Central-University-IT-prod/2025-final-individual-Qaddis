import { motion } from "motion/react"
import type { PropsWithChildren, ReactElement } from "react"
import type { NavLinkProps } from "react-router"

import { NavigationEnum } from "@/constants/navigation"
import NavLink from "../NavLink/NavLink"

import styles from "./SidebarLink.module.scss"

interface IProps
	extends Omit<NavLinkProps, "to" | "children">,
		PropsWithChildren {
	to: NavigationEnum
	icon: ReactElement
}

export default function SidebarLink({ to, icon, children, ...props }: IProps) {
	const returnClassName = ({ isActive }: { isActive: boolean }) =>
		isActive ? `${styles.link} ${styles.active}` : styles.link

	return (
		<NavLink className={returnClassName} to={to} {...props}>
			{icon}
			<motion.div
				className={styles.text}
				variants={{
					inactive: { gridTemplateColumns: "0fr", marginLeft: 0 },
					active: { gridTemplateColumns: "1fr", marginLeft: 5 }
				}}
				transition={{ duration: 0.2 }}
			>
				<div>{children}</div>
			</motion.div>
		</NavLink>
	)
}
