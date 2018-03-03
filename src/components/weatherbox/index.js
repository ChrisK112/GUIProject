// import preact
import { h, render, Component } from 'preact';

import style from './style';

export default class WeatherBox extends Component {

    // rendering a function when the button is clicked
    render() {
        return (
            <div class={ style.weatherBox }>
                <div >
                    <div id = "dayOne" class = { style.futureDay }>Mon</div>
					<div id = "dayTwo" class = { style.futureDay }>Tue</div>
					<div id = "dayThree" class = { style.futureDay }>Wed</div>
                </div>
                <div class={ style.today }>
					TODAY

                </div>

            </div>
        );
    }
}
