import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	PropsWithChildren
} from "react"

import styles from "./Buttons.module.scss"

type PropsType = PropsWithChildren &
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function OutlinedButton({
	children,
	className,
	...props
}: PropsType) {
	const getClassNames = (): string =>
		className
			? `${styles["outline-button"]} ${className}`
			: styles["outline-button"]

	return (
		<button className={getClassNames()} {...props}>
			{children}
		</button>
	)
}
