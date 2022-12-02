//all api calls to the exchangerates api
import axios from "axios";

//const url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP";
const baseURL = "https://v6.exchangerate-api.com/v6/";
const apiKey = "";

export default function makeConversion(amount, src, dest) {
	console.log(src);
	return new Promise((resolve, reject) => {
		var url = baseURL + apiKey + "/pair/" + src + "/" + dest + "/" + amount;

		axios
			.get(url)
			.then((res) => {
				var result = res.data.conversion_result;
				console.log(parseFloat(result).toLocaleString(undefined, { minimumFractionDigits: 2 }));
				resolve(parseFloat(result).toLocaleString(undefined, { minimumFractionDigits: 2 }));
			})
			.catch((error) => {
				reject(error);
			});
	});
}
