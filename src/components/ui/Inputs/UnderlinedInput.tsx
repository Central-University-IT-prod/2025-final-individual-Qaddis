import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

import styles from "./Inputs.module.scss"

type PropsType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

export default function UnderlinedInput({ className, ...props }: PropsType) {
	return (
		<input
			className={
				className
					? `${styles["underlined-input"]} ${className}`
					: styles["underlined-input"]
			}
			autoComplete="off"
			{...props}
		/>
	)
}
