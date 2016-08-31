import React, {Component} from 'react';
// import ReactRouter, {Router, Route, Navigation, History} from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import h from '../helpers';


export default class Order extends Component {
	constructor(props){
		super(props)

		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key){

		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		var removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

		if(!fish){
			return <li key={key}>Sorry, that item is no longer available! {removeButton}</li>
		}

		return (
			<li key={key}>
				<span>{count}lbs</span>
				<span>{fish.name}</span>
				<span className="price">{h.formatPrice(count * fish.price)}</span>
				{removeButton}
			</li>
		);
	}

	render(){
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key) => {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if(fish && isAvailable){
				return prevTotal + (count * Number(fish.price) || 0);
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<ul className="order">
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
			</div>
		);
	}
}