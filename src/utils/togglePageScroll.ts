// Включение/отключение скролла на странице
export function togglePageScroll(mode: "enable" | "disable"): void {
	if (mode === "disable") {
		document.body.style.paddingRight = `${
			window.innerWidth - document.documentElement.clientWidth
		}px`
		document.body.style.overflowY = "hidden"
	} else {
		document.body.style.paddingRight = "0"
		document.body.style.overflowY = "scroll"
	}
}
