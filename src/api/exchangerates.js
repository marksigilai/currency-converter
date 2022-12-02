//all api calls to the exchangerates api
import axios from "axios";

const baseURL = "https://v6.exchangerate-api.com/v6/";
const apiKey = "";

export default function makeConversion(amount, src, dest) {
	return new Promise((resolve, reject) => {
		if (apiKey === "") {
			reject("Missing API key, cannot perform request");
		}

		var url = baseURL + apiKey + "/pair/" + src + "/" + dest + "/" + amount;

		axios
			.get(url)
			.then((res) => {
				var result = res.data.conversion_result;
				resolve(parseFloat(result).toLocaleString(undefined, { minimumFractionDigits: 2 }));
			})
			.catch((error) => {
				reject("Error: Cannot perform conversion");
			});
	});
}
