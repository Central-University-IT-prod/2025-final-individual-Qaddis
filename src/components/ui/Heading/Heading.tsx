import type {
	DetailedHTMLProps,
	HTMLAttributes,
	PropsWithChildren
} from "react"

import styles from "./Heading.module.scss"

type PropsType = PropsWithChildren &
	Omit<
		DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
		"className"
	>

export default function Heading({ children, ...props }: PropsType) {
	return (
		<h2 className={styles.heading} {...props}>
			{children}
		</h2>
	)
}
