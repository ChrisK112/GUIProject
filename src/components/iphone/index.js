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
import wDataForecast from '../../data/LondonForecast.json'


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.state.fc1 = "10"; 
		this.state.fc2 = "20";
		this.state.fc3 = "30";
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
		
		//this.parseResponseF(wDataForecast);
		
		
	}

	// the main render method for the iphone component
	render() {
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
                    	<div class = {style.futureDay}>{ this.state.fc1 }Mon</div>
                    	<div class = {style.futureDay}>{ this.state.fc2 }Tue</div>
                  	  	<div class = {style.futureDay}>{ this.state.fc3 }Wed</div>
					</div> 
	                <div class={ style.today }>
    	                TODAY
						<div class = { style.condition }>{ this.state.cond }</div>
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
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
	
	parseResponseF = (parsed_json) => {
		var ftemp_c = parsed_json['forecast']['simple_forecast']['forecastday']['high']['celsius'];
		
		this.setState({
			fc : ftemp_c
		}) ;
		
	}
}