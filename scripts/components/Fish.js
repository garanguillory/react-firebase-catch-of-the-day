import React, {Component} from 'react';
import h from '../helpers';



export default class Fish extends Component {

	constructor(props){
		super(props)

		this.addToOrder = this.addToOrder.bind(this);
	}

	addToOrder(){
		console.log("Adding the fish: ", this.props.index);
		this.props.addToOrder(this.props.index);
	}

	render(){
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name}/>
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.description}</p>
				<button disabled={!isAvailable} onClick={this.addToOrder}>{buttonText}</button>
			</li>
		);
	}

}