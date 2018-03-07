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
	}


	setUnit = function(event) {
		this.props.settings.temperature_units = event.target.value;
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
								<label class={ styleiphone.htr }>Location: <input type="text" value={ this.props.settings.location } /></label>
							</div>
							<div>
								<label>Temperature units </label>
								<div onChange={ this.setUnit.bind(this) }>
									<label class={ styleiphone.htr }>Celsius <input type = "radio" name ="tUnits" value = "C" defaultChecked={this.props.settings.temperature_units === 'C'} /></label>
									<label class={ styleiphone.htr }>Fahrenheit <input type = "radio" name ="tUnits" value = "F" defaultChecked={this.props.settings.temperature_units === 'F'} /></label>
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
