const generateYears = () => {
	const currentYear = new Date().getFullYear()
	return Array.from({ length: 100 }, (_, i) => currentYear - 50 + i)
};

export default generateYears;