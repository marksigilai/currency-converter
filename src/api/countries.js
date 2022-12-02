//requests to the rest countries api
import axios from "axios";

//get all countries and obtain their currencies, no direct way to obtain just currencies
const url = "https://restcountries.com/v2/all?fields=name,currencies";

/*
makes an api request to get all currencies, obtain currency from each specific country, 
some countries support multiple currencies so removes duplicates that arise
*/
export default function getAllCurrencies() {
	return new Promise((resolve, reject) => {
		var currenciesArr = [];
		var uniqueCodes = [];
		axios
			.get(url)
			.then((res) => {
				res.data.forEach((country) => {
					if (country.currencies !== undefined) {
						country.currencies.forEach((currency) => {
							var item = {
								name: currency.name,
								currency: currency.code,
							};
							//removing duplicates
							if (!uniqueCodes.includes(item.currency)) {
								currenciesArr.push(item);
								uniqueCodes.push(item.currency);
							}
						});
					}
				});
				//order alphabetically
				currenciesArr.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				});
				resolve(currenciesArr);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
}
