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

	constructor(props){
		super(props);
		this.state = {
			location: this.props.settings.location,
			currentError: this.props.settings.currentError,
			background: this.props.settings.background,
		};
		this.props.settings.currentError = null;
	}


	locationChange(event) {
		this.setState({value});
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


		});
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

	setGirl = function(event) {
		this.props.settings.girl_model = event.target.value;
	}

	setBackground = function(event) {
		this.setState({ background: event.target.value });
		this.props.settings.background = event.target.value;
	}

	setColour = function(event) {
		this.props.settings.text_colour = event.target.value;
	}

	setLoc = (e) =>{
	  this.setState({location: e.target.value});
		this.props.settings.location = e.target.value;
	}


	// the main render method for the iphone component
	render() {
		let backgroundStyle = {
			backgroundImage: "url(/assets/backgrounds/" + this.state.background + ")",
			backgroundRepeat  : 'no-repeat'
		};

		// display all weather data
		return (
			<div id="app">
				<div class={ styleiphone.container } style = { backgroundStyle } >
					<SettingsCog page = { "/" }/>
					<div class = { style.settings } >
						<h1>App Setup</h1>
						{ this.state.currentError && <div class={ style.currentError }>{ this.state.currentError }</div> }
						<form>
							<div>
								<label  for="locationInput">Location :</label>
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
								<label>Temperature Unit :</label>
								<div onChange={ this.setUnit.bind(this) }>
									<label >Celsius <input type = "radio" name ="tUnits" value = "C" defaultChecked={this.props.settings.temperature_units === 'C'} /></label>
									<label >Fahrenheit <input type = "radio" name ="tUnits" value = "F" defaultChecked={this.props.settings.temperature_units === 'F'} /></label>
								</div>
							</div>

							<div>
								<label>Girl Style :</label>
								<div onChange = {this.setGirl.bind(this)} >
									<label>Summer <input type = "radio" name = "girlModel" value= "hot" defaultChecked={this.props.settings.girl_model === 'hot'} /></label>
									<label>Mild <input type = "radio" name = "girlModel" value= "mild" defaultChecked={this.props.settings.girl_model === 'mild'} /></label>
									<label>Cold <input type = "radio" name = "girlModel" value= "cold" defaultChecked={this.props.settings.girl_model === 'cold'} /></label>
									<label>Rain <input type = "radio" name = "girlModel" value= "rain" defaultChecked={this.props.settings.girl_model === 'rain'} /></label>
								</div>
							</div>

							<div>
								<label>Background :</label>
								<div onChange={ this.setBackground.bind(this) }>
									<label ><p></p><input type = "radio" name ="background" value = "pexels-photo-1.jpg" defaultChecked={this.props.settings.background === 'pexels-photo-1.jpg'} /><img src="/assets/backgrounds/pexels-photo-1.jpg"></img> </label>
									<label ><p></p><input type = "radio" name ="background" value = "pexels-photo-2.jpg" defaultChecked={this.props.settings.background === 'pexels-photo-2.jpg'} /><img src="/assets/backgrounds/pexels-photo-2.jpg"></img> </label>
									<label ><p></p><input type = "radio" name ="background" value = "pexels-photo-3.jpg" defaultChecked={this.props.settings.background === 'pexels-photo-3.jpg'} /><img src="/assets/backgrounds/pexels-photo-3.jpg"></img> </label>
									<label ><p></p><input type = "radio" name ="background" value = "pexels-photo-4.jpg" defaultChecked={this.props.settings.background === 'pexels-photo-4.jpg'} /><img src="/assets/backgrounds/pexels-photo-4.jpg"></img> </label>
								</div>
							</div>

							<div>
								<label>Text Colour :</label>
								<div onChange={ this.setColour.bind(this) }>
									<label><p></p><input type = "radio" name ="textcolour" value = "white" defaultChecked={this.props.settings.text_colour === 'white'} /><img src="/assets/icons/whiteRectangle.png"></img> </label>
									<label><p></p><input type = "radio" name ="textcolour" value = "black" defaultChecked={this.props.settings.text_colour === 'black'} /><img src="/assets/icons/blackRectangle.png"></img> </label>
									<label><p></p><input type = "radio" name ="textcolour" value = "red" defaultChecked={this.props.settings.text_colour === 'red'} /><img src="/assets/icons/redRectangle.png"></img> </label>
									<label><p></p><input type = "radio" name ="textcolour" value = "yellow" defaultChecked={this.props.settings.text_colour === 'yellow'} /><img src="/assets/icons/yellowRectangle.png"></img> </label>
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
