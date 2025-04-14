import type {
	DetailedHTMLProps,
	LabelHTMLAttributes,
	PropsWithChildren
} from "react"

import styles from "./Label.module.scss"

type PropsType = PropsWithChildren &
	DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export default function Label({ children, className, ...props }: PropsType) {
	return (
		<label
			className={className ? `${styles.label} ${className}` : styles.label}
			{...props}
		>
			{children}
		</label>
	)
}
