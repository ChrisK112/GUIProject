// import preact
import { h, render, Component } from 'preact';

import style from './style';
    
export default class WeatherBox extends Component {

    // rendering a function when the button is clicked
    render() {
        return (
            <div class={ style.weatherBox }>
                <div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>

                </div>
                <div class={ style.today }>
                    Today
                </div>

            </div>
        );
    }
}