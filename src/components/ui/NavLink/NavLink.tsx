import { NavLink as Link, type NavLinkProps } from "react-router"

import { NavigationEnum } from "@/constants/navigation"

import styles from "./NavLink.module.scss"

interface IProps extends Omit<NavLinkProps, "to"> {
	to: NavigationEnum
}

export default function NavLink({ to, children, ...props }: IProps) {
	const returnClassName = ({ isActive }: { isActive: boolean }): string =>
		isActive ? `${styles.link} ${styles.active}` : styles.link

	return (
		<Link to={to} className={returnClassName} {...props}>
			{children}
		</Link>
	)
}
