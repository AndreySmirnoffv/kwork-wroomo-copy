import { isLeapYear } from './isLeapYear'

export const getDaysInMonth = (year: number, month: number): number => {
	if (month === 2) {
		return isLeapYear(year) ? 29 : 28
	}
	if ([4, 6, 9, 11].includes(month)) {
		return 30
	}
	return 31
}