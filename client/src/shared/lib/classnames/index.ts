function classNames(...classes: Array<string | undefined | { [key: string]: boolean }>): string {
	return classes
		.flatMap(cls => {
			// Если это строка, просто вернуть её
			if (typeof cls === 'string') {
				return cls
			}

			// Если это объект, вернуть ключи, где значение true
			if (typeof cls === 'object' && cls !== null) {
				return Object.keys(cls).filter(key => cls[key])
			}

			return []
		})
		.join(' ')
}
export default classNames