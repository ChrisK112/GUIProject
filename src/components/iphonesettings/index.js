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
        console.log(props);
    }

    // the main render method for the iphone component
    render() {

        // display all weather data
        return (
            <div id="app">
                <div class={ style.container }>
                    <h1>Settings</h1>
                    <a class={ style.settings } href="/">Back</a>
                    <div>
                    <form>
						<label>Location: <input type="text" value={ this.props.settings.location } /></label> <br> </br>
						<label>Temperature units </label> <br> </br>
						<input type = "radio" name ="tUnits" value = "C"> Centigrade </input>  <br> </br>
						<input type = "radio" name ="tUnits" value = "F"> Fahrenheit </input>  <br> </br>


                    </form>
                    </div>
                </div>

            </div>
        );
    }


        //weather icons from https://www.iconfinder.com/icons/1530392/sun_sunny_temperature_weather_icon#size=256


}
