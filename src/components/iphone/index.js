import preact from 'preact';
import { h, render, Component } from 'preact';
import Router from 'preact-router';

// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import the settingscog component


import weatherData from '../../data/London.json';
import wDataForecast from '../../data/LondonForecast.json';
import failedLookup from '../../data/FailedLookup.json';

import SettingsCog from '../settingscog';
import Girl from '../girl';
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
		
		let myStorage = window.localStorage;
		let cwData = myStorage.getItem('wData');
		let location = this.props.settings.location;

		if (!cwData) {
			// fetch actual data
			console.log('ajax fetching weather data');

			let url = 'http://api.wunderground.com/api/3aec23f2e15b08b5/conditions/q/UK/' + location + '.json';
			let that = this;

			$.ajax({
				url: url,
				dataType: "jsonp",
				success : function(response) {
					myStorage.setItem('wData', JSON.stringify(response));
					that.parseResponse(response);
				},
				error : function(req, err){ console.log('API call failed ' + err); }
			});

		} else {
			console.log('cached weather data loaded');
			cwData = JSON.parse(cwData);
			this.parseResponse(cwData);
		}
		//this.parseResponse(failedLookup);


	}
	//for forecast, it would be
	//http://api.wunderground.com/api/Your_Key/forecast/q/UK/London.json

	fetchForecastData = () => {

		let myStorage = window.localStorage;
		let cfData = myStorage.getItem('fData');
		let location = this.props.settings.location;

		if (!cfData) {

			console.log('ajax fetching forecast data');

			let url = 'http://api.wunderground.com/api/3aec23f2e15b08b5/forecast/q/UK/' + location + '.json';
			let that = this;

			$.ajax({
				url: url,
				dataType: "jsonp",
				success : function(response) {
					myStorage.setItem('fData', JSON.stringify(response));
					that.parseResponseF(response);
				},
				error : function(req, err){ console.log('API call failed ' + err); }
			});

			// fetch actual data
			//cfData = wDataForecast;
			//myStorage.setItem('fData', JSON.stringify(cfData));

		} else {
			console.log('cached forecast data loaded');
			cfData = JSON.parse(cfData);
			this.parseResponseF(cfData);
		}

		//this.parseResponseF(failedLookup);

	}



	// the main render method for the iphone component
	render() {
		this.fetchWeatherData;
		this.fetchForecastData;

		console.log(this.state);
		let backgroundStyle = {
			backgroundImage: "url(/assets/backgrounds/" + this.props.settings.background + ")",
			backgroundRepeat  : 'no-repeat'
		};
		// display all weather data
		return (
			<div id="app">
				<div class={ style.container }>
					<SettingsCog page = { "/iphonesettings" } />
					<Girl model = { this.props.settings.girl_model } />
					<div class={ style.container } style = { backgroundStyle } ></div>
					<div class={ style.blur } style = { backgroundStyle } ></div>

					<WeatherBox settings={ this.props.settings } temp={this.state.temp} cond={this.state.cond} f1={this.state.fd1} f2={this.state.fd2} f3={this.state.fd3} />
				</div>

			</div>
		);
	}


	parseResponse = (parsed_json) => {

		let temp_c, conditions, condImg;

		if (parsed_json.response.error) {
			temp_c = 500;
			conditions = 'Error';
			condImg = this.determineImage(conditions);
			this.setState({
				temp: temp_c,
				cond : condImg
			});

			this.locationError(parsed_json.response.error.description);

			return;
		}

		temp_c = parsed_json['current_observation']['temp_c'];
		if (this.props.settings.temperature_units == 'F') {
			temp_c = parsed_json['current_observation']['temp_f'];
		}

		conditions = parsed_json['current_observation']['weather'];
		condImg = this.determineImage(conditions);


		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : condImg
		});

	}

	parseResponseF = (parsed_json) => {

		if (parsed_json.response.error) {

			fday1 = fday2 = fday3 = 'Mon';
			ft1 = ft2 = ft3 = 500;
			fimg1 = fimg2 = fimg3 = this.determineImage('Error');

			this.setState({
				fd1 : { fday1, ft1, fimg1 },
				fd2 : { fday2, ft2, fimg2 },
				fd3 : { fday3, ft3, fimg3 }
			}) ;
			return;
		}


		//temperatures
		let ft1 = parsed_json.forecast.simpleforecast.forecastday[1].high.celsius;
		let ft2 = parsed_json.forecast.simpleforecast.forecastday[2].high.celsius;
		let ft3 = parsed_json.forecast.simpleforecast.forecastday[3].high.celsius;

		if (this.props.settings.temperature_units == 'F') {
			ft1 = parsed_json.forecast.simpleforecast.forecastday[1].high.fahrenheit;
			ft2 = parsed_json.forecast.simpleforecast.forecastday[2].high.fahrenheit;
			ft3 = parsed_json.forecast.simpleforecast.forecastday[3].high.fahrenheit;
		}

		//conditions
		let fc1 = parsed_json.forecast.simpleforecast.forecastday[1].conditions;
		let fc2 = parsed_json.forecast.simpleforecast.forecastday[2].conditions;
		let fc3 = parsed_json.forecast.simpleforecast.forecastday[3].conditions;

		//conditions img

		let fimg1 = this.determineImage(fc1);
		let fimg2 = this.determineImage(fc2);
		let fimg3 = this.determineImage(fc3);

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


	determineImage = (condition) => {
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

		return imgSrc + ".png";

	}

		//weather icons from https://www.iconfinder.com/icons/1530392/sun_sunny_temperature_weather_icon#size=256


	locationError = (error) => {

		this.props.settings.currentError = 'Please check your location: ' + error;
		Router.route('/iphonesettings', true);

	}

}
