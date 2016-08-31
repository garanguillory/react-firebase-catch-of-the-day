import React, {Component} from 'react';


export default class Header extends Component {

	// propTypes(){}

	render(){
		// console.log(this.props);
		return (
			<header className="top">
				<h1>Catch 
					<span className="ofThe">
						<span className="of">of</span>
						 <span className="the">The</span>
						 </span>
						 Day</h1>
				<h3 className="tagline">
					<span>{this.props.tagline}</span>
				</h3>
			</header>
		);
	}

}