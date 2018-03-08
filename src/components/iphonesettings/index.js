import preact from 'preact';
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
//import style from './style';
import style from './style';
import styleiphone from '../iphone/style';
// import jquery for API calls
import $ from 'jquery';

import SettingsCog from '../settingscog';
import Iphone from '../iphone';

export default class IphoneSettings extends preact.Component {
//var Iphone = React.createClass({

    // a constructor with initial set states
	constructor(props){
		super(props);
		console.log(props);
		this.state = {location: this.props.settings.location}
	}

	locationChange(event) {
		this.setState({value})
	}


	reverseGeocode = function(lat, lon) {

		let url = 'https://api.postcodes.io/postcodes';
		let that = this;

		$.ajax({
			url: url,
			data: {lat, lon},
			dataType: "jsonp",
			success: function(json) {
				console.log(json);
				if (json.status == 200) {
					that.props.settings.geocode = json.result;
					if (json.result.length) {
						that.setState({location: json.result[0].postcode});
						that.props.settings.location = json.result[0].postcode;
						console.log('set location to postcode ' + json.result[0].postcode);
					}

				} else {
					console.log('geocode failed with ' + json.status);
				}
			},
			error: function(req, err) {
				console.log('reverse geocode ajax failed');
			}


		})
	}

	geoLocate = function(e) {
		let that = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log(position.coords.latitude, position.coords.longitude);
			that.reverseGeocode(position.coords.latitude, position.coords.longitude);
		});
		e.preventDefault();
	}


	setUnit = function(event) {
		this.props.settings.temperature_units = event.target.value;
	}

	setLoc = (e) =>{ 
	  this.setState({location: e.target.value});
		this.props.settings.location = event.target.value;
	}


	// the main render method for the iphone component
	render() {

		// display all weather data
		return (
			<div id="app">
				<div class={ styleiphone.container }>
					<SettingsCog page = { "/" }/>
					<div class = { style.settings } >
						<h1>App Setup</h1>
						<form>
							<div>
								<label >Location: <input type="text" value={ this.state.location } onChange={ this.setLoc } /></label>
								{ "geolocation" in navigator && <a href="#" onClick={ this.geoLocate.bind(this) }>Geolocate</a>}
							</div>
							<div>
								<label>Temperature units </label>
								<div onChange={ this.setUnit.bind(this) }>
									<label >Celsius <input type = "radio" name ="tUnits" value = "C" defaultChecked={this.props.settings.temperature_units === 'C'} /></label>
									<label >Fahrenheit <input type = "radio" name ="tUnits" value = "F" defaultChecked={this.props.settings.temperature_units === 'F'} /></label>
								</div>
							</div>

							<a href="/"><button>Finish Setup</button></a>

						</form>
					</div>
				</div>

			</div>
		);
	}


        //weather icons from https://www.iconfinder.com/icons/1530392/sun_sunny_temperature_weather_icon#size=256


}
