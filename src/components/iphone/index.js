import preact from 'preact';
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import the settingscog component

import SettingsCog from '../settingscog';

import weatherData from '../../data/London.json';
import wDataForecast from '../../data/LondonForecast.json';

import WeatherBox from "../weatherbox";




export default class Iphone extends preact.Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.fetchWeatherData();
		this.fetchForecastData();

	}



	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
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
			<div id="app">
				<div class={ style.container }>
					<SettingsCog page = { "/iphonesettings" } />
					<div class={ style.girl_container }></div>
					<div class={ style.container }></div>
					<div class={ style.blur }></div>

					<WeatherBox settings={ this.props.settings } temp={this.state.temp} cond={this.state.cond} f1={this.state.fd1} f2={this.state.fd2} f3={this.state.fd3} />
				</div>

			</div>
		);
	}


	parseResponse = (parsed_json) => {

		let temp_c = parsed_json['current_observation']['temp_c'];
		let conditions = parsed_json['current_observation']['weather'];
		let condImg = this.determineImage(conditions, "128");


		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : condImg,
		});

	}

	parseResponseF = (parsed_json) => {

		//temperatures
		let ft1 = parsed_json.forecast.simpleforecast.forecastday[1].high.celsius;
		let ft2 = parsed_json.forecast.simpleforecast.forecastday[2].high.celsius;
		let ft3 = parsed_json.forecast.simpleforecast.forecastday[3].high.celsius;

		//conditions
		let fc1 = parsed_json.forecast.simpleforecast.forecastday[1].conditions;
		let fc2 = parsed_json.forecast.simpleforecast.forecastday[2].conditions;
		let fc3 = parsed_json.forecast.simpleforecast.forecastday[3].conditions;

		//conditions img

		let fimg1 = this.determineImage(fc1, "32");
		let fimg2 = this.determineImage(fc2, "32");
		let fimg3 = this.determineImage(fc3, "32");

		//days
		let fday1 = parsed_json.forecast.simpleforecast.forecastday[1].date.weekday_short;
		let fday2 = parsed_json.forecast.simpleforecast.forecastday[2].date.weekday_short;
		let fday3 = parsed_json.forecast.simpleforecast.forecastday[3].date.weekday_short;


		this.setState({
			fd1 : { fday1, ft1, fimg1 },
			fd2 : { fday2, ft2, fimg2 },
			fd3 : { fday3, ft3, fimg3 }
		}) ;

	}


	determineImage = (condition, size) => {
		let imgSrc = "";

		//determine which image to use
		switch (condition) {
			case "Sunny":
				imgSrc = "../../assets/icons/sunny";
				break;
			case "Partly Cloudy":
			case "Mostly Cloudy":
				imgSrc = "../../assets/icons/cloudy";
				break;
			case "Raining":
				imgSrc = "../../assets/icons/rain";
				break;
			//and so on - in stored data its mostly cloudy
			default:
				imgSrc = "../../assets/icons/sunny";
				break;
		}

		return imgSrc + size + ".png";

	}

		//weather icons from https://www.iconfinder.com/icons/1530392/sun_sunny_temperature_weather_icon#size=256


}
