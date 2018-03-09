// import 'promise-polyfill';
// import 'isomorphic-fetch';
import Router from 'preact-router';
import { h, render, Component } from 'preact';

import Iphone from './components/iphone';
import Settings from './components/settings';

import './style';

let root;

class Main extends Component {

	constructor(props) {

		super(props);

        let myStorage = window.localStorage;
        let appSettings = myStorage.getItem('appSettings');

        if (!appSettings) {
            // fetch actual data
            appSettings = {
                location: 'London',
                temperature_units: 'C',
                geocode: null,
                currentError: null,
                girl_model : 'rain',
                background : 'pexels-photo-1.jpg',
                text_colour : 'white'
            };

            myStorage.setItem('appSettings', JSON.stringify(appSettings));
            console.log('settings saved to local storage');

        } else {
            console.log('cached settings loaded');
            appSettings = JSON.parse(appSettings);
        }

        console.log(appSettings);

		this.state.settings = appSettings;

        // preload
        this.preload(
        '/assets/girl/cold.png',
        '/assets/girl/hot.png',
        '/assets/girl/mild.png',
        '/assets/girl/rain.png',
        '/assets/backgrounds/pexels-photo-1.jpg',
        '/assets/backgrounds/pexels-photo-2.jpg',
        '/assets/backgrounds/pexels-photo-3.jpg',
        '/assets/backgrounds/pexels-photo-4.jpg'
        );

	}

    preload = function() {
        let images = [];
        for (var i = 0; i < arguments.length; i++ ) {
            images[i] = new Image();
            images[i].src = arguments[i];
        }
    }

	render() {
		return (
            <Router>
                <Iphone path="/" settings={ this.state.settings } />
                <Settings path="/settings" settings={ this.state.settings } />
            </Router>
		);
	}

}

function init() {
	//let App = require('./components/app').default;
	//root = render(<App />, document.body, root);
	root = render(<Main />, document.body, root);

}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
