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
		this.state = {location: this.props.settings.location, currentError: this.props.settings.currentError}
		this.props.settings.currentError = null;
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
		this.props.settings.location = e.target.value;
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
						{ this.state.currentError && <div class={ style.currentError }>{ this.state.currentError }</div> }
						<form>
							<div>
								<label for="locationInput">Location:</label>
								<div class={ style.locationWrapper }>
									<input type="text" id="locationInput" value={ this.state.location } onChange={ this.setLoc } />
									{ "geolocation" in navigator && <a href="#" title="Geolocate" onClick={ this.geoLocate.bind(this) }>
										<div class={ style.geolocate }>
											<svg id="icon" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
											    <path d="M512.001,302.46c-115.762,0-209.541,93.808-209.541,209.541c0,115.761,93.779,209.541,209.541,209.541 c115.819,0,209.538-93.779,209.538-209.541C721.539,396.268,627.82,302.46,512.001,302.46z" fill="#fff" />
											    <path d="M838.411,482.066c-14.439-157.447-138.854-281.92-296.476-296.274V62.986h-59.869v122.807 C324.444,200.146,200.03,324.619,185.588,482.066H62.986v59.869h122.602c14.442,157.389,138.856,281.861,296.479,296.302v122.777 h59.869V838.237c157.621-14.44,282.036-138.913,296.476-296.302h122.603v-59.869H838.411z M512.001,781.407 c-148.736,0-269.409-120.671-269.409-269.407c0-148.766,120.673-269.409,269.409-269.409 c148.792,0,269.406,120.644,269.406,269.409C781.407,660.737,660.793,781.407,512.001,781.407z" fill="#fff" />
											</svg>
										</div>
										</a>
									}
								</div>
							</div>
							<div>
								<label>Temperature unit:</label>
								<div onChange={ this.setUnit.bind(this) }>
									<label >Celsius <input type = "radio" name ="tUnits" value = "C" defaultChecked={this.props.settings.temperature_units === 'C'} /></label>
									<label >Fahrenheit <input type = "radio" name ="tUnits" value = "F" defaultChecked={this.props.settings.temperature_units === 'F'} /></label>
								</div>
							</div>

							<div>
								<label>Girl style</label>
								<div>
									<label>Summer <input type = "radio" name = "gSummer" value= "Summer" /></label>
									<label>Mild <input type = "radio" name = "gMild" value= "Mild" /></label>
									<label>Cold <input type = "radio" name = "gCold" value= "Cold" /></label>
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
