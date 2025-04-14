import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

import styles from "./Inputs.module.scss"

type PropsType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

export default function Input({ className, ...props }: PropsType) {
	return (
		<input
			className={className ? `${styles.input} ${className}` : styles.input}
			autoComplete="off"
			{...props}
		/>
	)
}
