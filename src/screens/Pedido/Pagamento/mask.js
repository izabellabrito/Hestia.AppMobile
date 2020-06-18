export function numero(value) {
	return value
		.replace(/\s?/g, '')
		.replace(/(\d{4})/g, '$1 ')
		.trim();
}

export function vencimento(value) {
	return value
		.replace(/\s?/g, '')
		.replace(/(\d{4})/g, '$1 ')
		.trim();
}
