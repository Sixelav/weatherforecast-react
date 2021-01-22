import React from 'react';
import moment from 'moment';

const conditions = (props) => {
	let parsedArray = [];

	function parseResponse(rObj) {
		let days = [];
		let cnt = 0;
		rObj.list.forEach(element => {
			if ((moment.unix(element.dt).dayOfYear() === moment().dayOfYear()) && !days.find(fd => fd === moment.unix(element.dt).dayOfYear())) {
				days.push(moment.unix(element.dt).dayOfYear());
				cnt += 1;
				parsedArray.push(element);
			} else if ((!days.find(fd => fd === moment.unix(element.dt).dayOfYear())) && (moment.unix(element.dt).hour() === 13) && cnt < 5) {
				days.push(moment.unix(element.dt).dayOfYear());
				cnt += 1;
				parsedArray.push(element);
			}
		});
	}

	if (props.responseObj.cod === "200") {
		return (
			<div className="container">
				<div className="alert alert-info" role="alert">
					<h3>City : {props.responseObj.city.name},{props.responseObj.city.country}</h3>
				</div>

				{parseResponse(props.responseObj)}
				<div className="row" >
					{
						parsedArray.map(el =>
							<div className="card col-md-15" key={el.dt}>
								<div className="card-header">
									<h5 className="card-title"> {moment.unix(el.dt).format("dddd, MMMM Do YYYY, H:mm:ss")}</h5>
								</div>
								<div className="card-img-top">
									<img src={'http://openweathermap.org/img/w/' + el.weather[0].icon + '.png'} alt="" />
									<h4>{el['main'].temp} °C</h4>
									<h5>{el['weather'][0].main} </h5>

									<span className="badge badge-warning">{el['main'].temp_max} °C</span>
									<span className="badge badge-secondary">{el['main'].temp_min} °C</span>
								</div>
								<div className="card-body">
									<h5>{el['weather'][0].description} </h5>

									<h6>wind : {el['wind'].speed} m/s </h6>

									<h6>Pressure : {el['main'].pressure} hPa</h6>

									<h6>Humidity : {el['main'].humidity} %</h6>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	} else {
		return null
	}
}
export default conditions;