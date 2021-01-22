import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';

const Forecast = () => {

	let [responseObj, setResponseObj] = useState({});

	function getForecast() {
		// weather data fetch function will go here
		fetch("https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=b8d1d9a02ec676e2253fc854cc03d86f", {
			"method": "GET",
			"headers": {}
		})
			.then(response => response.json())
			.then(response => {
				setResponseObj(response)
			})

	}

	getForecast();
	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				<h1>Welcome to Weather Forecast</h1>
			</div>
			<Conditions
				responseObj={responseObj}
			/>
		</div>
	)
}

export default Forecast;