import React, { useEffect } from "react";
import "./Homepage.css";

import getAllCurrencies from "../api/countries";
import makeConversion from "../api/exchangerates";
import validateForm from "../helpers/validation.js";
import Banner from "./Banner";
import Dropdown from "./Dropdown";
import Logo from "./Logo";

//TODO if 2 countries have the same currency display red error band
//TODO update readme to explain vagueness with "source country currency" description

function Homepage() {
	const [currencies, setCurrencies] = React.useState([]);
	const [result, setResult] = React.useState("");
	const [err, setErr] = React.useState(null);
	const [inputs, setInputs] = React.useState({ amount: 0, srcCurrency: null, destCurrency: null });

	//updates state when any input element value is changed
	const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

	const handleSubmit = (event) => {
		event.preventDefault();

		validateForm(inputs)
			.then(() => {
				makeConversion(...Object.values(inputs))
					.then((res) => {
						setResult(res + " " + inputs.destCurrency);
						setErr(null);
					})
					.catch((error) => {
						setErr("Error: could not calculate conversion");
					});
			})
			.catch((errMsg) => {
				setErr(errMsg);
			});
	};

	useEffect(() => {
		getAllCurrencies()
			.then((res) => {
				var allCurrencies = [];
				allCurrencies = [...res];
				//load for 0.5 seconds not necessary but looks good
				setTimeout(() => setCurrencies(allCurrencies), 0);
			})
			.catch((error) => {
				setErr("Error: could not obtain currencies");
			});
	}, []);

	if (currencies.length === 0) {
		return (
			<div className="flex-container">
				<Logo />
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="Homepage flex-container">
			<div className="Homepage-container flex-container space rounded">
				{err && <Banner onEnter={setTimeout(() => setErr(null), 3000)} type="error" errorMsg={err} />}
				<Logo />

				<form className="flex-container flex-left">
					<div className="space amt">
						<label for="amount">Amount</label>
						<input className="inp" type="number" name="amount" onChange={handleChange} />
					</div>

					<Dropdown name="srcCurrency" currencies={currencies} handleChange={handleChange} heading="From" />

					<Dropdown name="destCurrency" currencies={currencies} handleChange={handleChange} heading="To" />

					<div className="space">
						<button className="inp rounded" type="submit" onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</form>
				{result !== null && <div className="space">{result}</div>}
			</div>
		</div>
	);
}

export default Homepage;
