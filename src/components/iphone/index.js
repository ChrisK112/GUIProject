// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';


import weatherData from '../../data/London.json';

import wDataForecast from '../../data/LondonForecast.json';


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.fetchWeatherData();
		this.fetchForecastData();

		// button display state
		this.setState({ display: true });
	}



	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		//for forecast, it would be
		//http://api.wunderground.com/api/Your_Key/forecast/q/UK/London.json

		/*
		var url = "http://api.wunderground.com/api/3aec23f2e15b08b5/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		*/
		this.parseResponse(weatherData);


	}
	//for forecast, it would be
	//http://api.wunderground.com/api/Your_Key/forecast/q/UK/London.json

	fetchForecastData = () => {
		this.parseResponseF(wDataForecast);


	}

	// the main render method for the iphone component
	render() {
		this.fetchWeatherData;
		this.fetchForecastData;
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={ style.container }>
			<div class={ style.girl_container }></div>
			<div class= { style_iphone.container }> </div>
			<div class= { style.blur } ></div>
			<div class={ style.weatherBox }>
				<div>
					<div class = {style.futureDay}>Mon <img src = "../../assets/icons/sunny32.png"> </img> { this.state.fc1 }</div>
					<div class = {style.futureDay}>Tue <img src = "../../assets/icons/sunCloud32.png"> </img> { this.state.fc2 }</div>
					<div class = {style.futureDayLast}>Wed <img src = "../../assets/icons/cloudy32.png"> </img> { this.state.fc3 }</div>
				</div>
				<div class ={ style.today }>
					TODAY
					<div class = { style.condition }> <img src = "../../assets/icons/cloudy128.png"> </img> </div>
					<div class = { style.temperature }>{ this.state.temp }&#176;C</div>
				</div>

			</div>
		</div>
		);
	}

	parseResponse = (parsed_json) => {
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		



		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : conditions
		});

	}

	parseResponseF = (parsed_json) => {
		var ftemp_c1 = parsed_json.forecast.simpleforecast.forecastday[1].high.celsius;
		var ftemp_c2 = parsed_json.forecast.simpleforecast.forecastday[2].high.celsius;
		var ftemp_c3 = parsed_json.forecast.simpleforecast.forecastday[3].high.celsius;

		this.setState({
			fc1 : ftemp_c1,
			fc2 : ftemp_c2,
			fc3 : ftemp_c3
		}) ;

	}


		//weather icons from https://www.iconfinder.com/icons/1530392/sun_sunny_temperature_weather_icon#size=256

}

