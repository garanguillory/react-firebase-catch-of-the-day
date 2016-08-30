import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Router, Route, Navigation, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import h from './helpers';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass("https://catch-of-the-day-6e2b8.firebaseio.com");

export class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fishes: {},
			order: {}
		};
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.renderFish = this.renderFish.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
	}

	componentDidMount(){
		console.log("component did mount");
		base.syncState(this.props.params.storeId + '/fishes', {
			context: this,
			state: 'fishes'
		});
	}

	addToOrder(key){
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({order: this.state.order});
	}

	loadSamples(){
		this.setState({
			fishes: require('./sample-fishes')
		});
	}

	addFish(fish){
		var timeStamp = (new Date()).getTime();
		// update the state object
		this.state.fishes[`fish-${timeStamp}`] = fish;
		// set the state
		this.setState({fishes: this.state.fishes});
	}

	renderFish(key){
		return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		);
	}

}

export class Fish extends Component {

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

export class AddFishForm extends Component {

	constructor(props){
		super(props)

		this.createFish = this.createFish.bind(this);
	}

	createFish(event){
		event.preventDefault();
		// Take the data from teh form and create an object
		var fish = {
			name: this.refs.name.value,
			price: this.refs.price.value,
			status: this.refs.status.value,
			description: this.refs.description.value,
			image: this.refs.image.value
		};
		// Add the fish to the App State
		console.log(fish);
		this.props.addFish(fish);
		this.refs.fishForm.reset();
	}

	render(){
		return (
		  <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
		    <input type="text" ref="name" placeholder="Fish Name"/>
		    <input type="text" ref="price" placeholder="Fish Price" />
		    <select ref="status">
		      <option value="available">Fresh!</option>
		      <option value="unavailable">Sold Out!</option>
		    </select>
		    <textarea type="text" ref="description" placeholder="Description"></textarea>
		    <input type="text" ref="image" placeholder="URL to Image" />
		    <button type="submit">+ Add Item </button>
		  </form>
		);
	}

}

export class Header extends Component {

	render(){
		console.log(this.props);
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

export class Order extends Component {

	constructor(props){
		super(props)

		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key){

		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if(!fish){
			return <li key={key}>Sorry, that item is no longer available!</li>
		}

		return (
			<li key={key}>
				<span>{count}lbs</span>
				<span>{fish.name}</span>
				<span className="price">{h.formatPrice(count * fish.price)}</span>
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

export class Inventory extends Component {

	render(){
		return (
			<div>
				<h2>Inventory</h2>
				<AddFishForm {...this.props}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		);
	}

}

export class StorePicker extends Component {

	constructor(props){
		super(props)

		this.goToStore = this.goToStore.bind(this);
		// this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	goToStore(event){
		event.preventDefault();
		// console.log(event.target);
		// get the data from the input
		console.log("this :", this);
		var storeId = this.refs.storeId.value;
		console.log(storeId);
		// tranistion from <StorePicker/> to <App/>
		this.props.history.pushState(null, `/store/${storeId}`);
	}

	render(){
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
				<input type="submit"/>
			</form>
		);
	}

}

export class NotFound extends Component {

	render(){
		return (
			<h1>Page Not Found!</h1>
		);
	}

}


var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
);


ReactDOM.render(routes, document.querySelector('#main'));










