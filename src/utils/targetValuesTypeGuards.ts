// TypeGuard для проверки "вес-повторения"
export function targetValueIsWeightRepeats(
	value: NonNullable<unknown>
): value is { weight: number; repeats: number } {
	return typeof value === "object" && "weight" in value && "repeats" in value
}

// TypeGuard для проверки "вес-время"
export function targetValueIsWeightTime(
	value: NonNullable<unknown>
): value is { weight: number; time: number } {
	return typeof value === "object" && "weight" in value && "time" in value
}
