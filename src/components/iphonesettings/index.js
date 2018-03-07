// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
//import style from './style';
import style from '../iphone/style';
// import jquery for API calls
import $ from 'jquery';
// import the Button component

export default class IphoneSettings extends Component {
//var Iphone = React.createClass({

    // a constructor with initial set states
    constructor(props){
        super(props);
    }

    setUnit = function(event) {
        this.props.settings.temperature_scale = event.target.value;
    }

    // the main render method for the iphone component
    render() {

        // display all weather data
        return (
            <div id="app">
                <div class={ style.container }>
                    <h1>App Setup</h1>
                    <div>
                    <form>
						<label>Location: <input type="text" value={ this.props.settings.location } /></label> <br> </br>
						<label>Temperature units </label> <br> </br>
                        <div onChange={ this.setUnit.bind(this) }>
    						<label>Celsius <input type = "radio" name ="tUnits" value = "c" defaultChecked={this.props.settings.temperature_scale === 'c'} /></label>  <br> </br>
    						<label>Fahrenheit <input type = "radio" name ="tUnits" value = "f" defaultChecked={this.props.settings.temperature_scale === 'f'} /></label>  <br> </br>
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
