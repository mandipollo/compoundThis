const numberFormatter = Intl.NumberFormat("en", {
	notation: "compact",
});

const numberToDispaly = (number: number) => numberFormatter.format(number);

export default numberToDispaly;
