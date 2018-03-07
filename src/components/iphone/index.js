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

import WeatherBox from "../weatherbox";


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
		//let fd1 = {
		//	day : "Mon",
		//	image : "../../assets/icons/sunny32.png",
		//	temp : this.state.f1
		//};

		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div id="app">
				<div class={ style.container }>
					<a class={ style.settings } href="/iphonesettings">
						<svg class={ style.cog } xmlns="http://www.w3.org/2000/svg" viewBox="0 -256 1792 1792" id="svg3025">
						    <g transform="matrix(1 0 0 -1 121.492 1285.424)" id="g3027">
						        <path d="m 1024,640 q 0,106 -75,181 -75,75 -181,75 -106,0 -181,-75 -75,-75 -75,-181 0,-106 75,-181 75,-75 181,-75 106,0 181,75 75,75 75,181 z m 512,109 V 527 q 0,-12 -8,-23 -8,-11 -20,-13 l -185,-28 q -19,-54 -39,-91 35,-50 107,-138 10,-12 10,-25 0,-13 -9,-23 -27,-37 -99,-108 -72,-71 -94,-71 -12,0 -26,9 l -138,108 q -44,-23 -91,-38 -16,-136 -29,-186 -7,-28 -36,-28 H 657 q -14,0 -24.5,8.5 Q 622,-111 621,-98 L 593,86 q -49,16 -90,37 L 362,16 Q 352,7 337,7 323,7 312,18 186,132 147,186 q -7,10 -7,23 0,12 8,23 15,21 51,66.5 36,45.5 54,70.5 -27,50 -41,99 L 29,495 Q 16,497 8,507.5 0,518 0,531 v 222 q 0,12 8,23 8,11 19,13 l 186,28 q 14,46 39,92 -40,57 -107,138 -10,12 -10,24 0,10 9,23 26,36 98.5,107.5 72.5,71.5 94.5,71.5 13,0 26,-10 l 138,-107 q 44,23 91,38 16,136 29,186 7,28 36,28 h 222 q 14,0 24.5,-8.5 Q 914,1391 915,1378 l 28,-184 q 49,-16 90,-37 l 142,107 q 9,9 24,9 13,0 25,-10 129,-119 165,-170 7,-8 7,-22 0,-12 -8,-23 -15,-21 -51,-66.5 -36,-45.5 -54,-70.5 26,-50 41,-98 l 183,-28 q 13,-2 21,-12.5 8,-10.5 8,-23.5 z"
						        id="path3029" fill="rgba(255,255,255,0.5)" />
						    </g>
						</svg>
					</a>
					<div class={ style.girl_container }></div>
					<div class={ style_iphone.container }></div>
					<div class={ style.blur }></div>

					<WeatherBox settings={ this.props.settings } temp={this.state.temp} cond={this.state.cond} f1={this.state.fd1} f2={this.state.fd2} f3={this.state.fd3}/>
				</div>

			</div>
		);
	}

	parseResponse = (parsed_json) => {

		let temp_c = parsed_json['current_observation']['temp_c'];

		if (this.props.settings.temperature_scale == 'f') {
			temp_c = parsed_json['current_observation']['temp_f'];
		}

		let conditions = parsed_json['current_observation']['weather'];
		let condImg = this.determineImage(conditions, "128");


		// set states for fields so they could be rendered later on
		this.setState({
			temp: temp_c,
			cond : condImg
		});

	}

	parseResponseF = (parsed_json) => {

		//temperatures
		let ft1 = parsed_json.forecast.simpleforecast.forecastday[1].high.celsius;
		let ft2 = parsed_json.forecast.simpleforecast.forecastday[2].high.celsius;
		let ft3 = parsed_json.forecast.simpleforecast.forecastday[3].high.celsius;

		if (this.props.settings.temperature_scale == 'f') {
			ft1 = parsed_json.forecast.simpleforecast.forecastday[1].high.fahrenheit;
			ft2 = parsed_json.forecast.simpleforecast.forecastday[2].high.fahrenheit;
			ft3 = parsed_json.forecast.simpleforecast.forecastday[3].high.fahrenheit;
		}


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
