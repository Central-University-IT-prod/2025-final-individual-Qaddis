import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	PropsWithChildren
} from "react"

import styles from "./Buttons.module.scss"

type PropsType = PropsWithChildren &
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({ children, className, ...props }: PropsType) {
	const getClassNames = (): string =>
		className ? `${styles.button} ${className}` : styles.button

	return (
		<button className={getClassNames()} {...props}>
			{children}
		</button>
	)
}
