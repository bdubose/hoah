const dollarFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const dollarFormat = (amount?: number) =>
	amount !== undefined ? dollarFormatter.format(amount) : '';
