const numberFormatter = Intl.NumberFormat("en", {
	notation: "compact",
});

const numberToDisplay = (number: number) => numberFormatter.format(number);

export default numberToDisplay;
