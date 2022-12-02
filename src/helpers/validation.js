/*
    validations include:
        Empty input
        Missing source, destination, amount
        Invalid amount value <= 0
        Same source and destination - could just return same value ?
*/

export default function validateForm(input) {
	return new Promise((resolve, reject) => {
		if (Object.keys(input).length === 0) {
			reject("Error: Missing input");
		}

		for (const [key, value] of Object.entries(input)) {
			if (key === "amount") {
				if (value <= 0) {
					reject("Please enter an amount greater than 0");
				}
				if (value === null) {
					reject("Please enter an amount");
				}
			} else if (key === "destCurrency" && !value) {
				reject("Please enter a destination currency");
			} else if (key === "srcCurrency" && !value) {
				reject("Please enter a source currency");
			}
		}
		if (input.srcCurrency === input.destCurrency) {
			reject("Error: Source and Destination currencies are the same");
		}

		//TODO Validate e^x out of the amount field

		resolve();
	});
}
