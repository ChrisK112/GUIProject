import preact from 'preact';
import style from './style';
import { h, render, Component } from 'preact';

export default class Girl extends preact.Component{

	//constructor with inital set states
	constructor(props){
		super(props);
	}


	render(){

		let backgroundStyle = {
			backgroundImage: "url(/assets/girl/" + this.props.model + ".png)",
			backgroundRepeat  : 'no-repeat'
		};
		return (
			<div class = { style.girl_container } style = { backgroundStyle } ></div>
		);
	}

}

