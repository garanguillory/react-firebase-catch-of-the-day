import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Router, Route, Navigation, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import h from './helpers';
import reactMixin from 'react-mixin';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass("https://catch-of-the-day-6e2b8.firebaseio.com");

import Catalyst from 'react-catalyst';

// 
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import Header from './components/Header';
import Fish from './components/Fish';
import Inventory from './components/Inventory';
import AddFishForm from './components/AddFishForm';
import Order from './components/Order';
//

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
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
	}

	componentDidMount(){
		console.log("component did mount");
		base.syncState(this.props.params.storeId + '/fishes', {
			context: this,
			state: 'fishes'
		});

		var localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUpdate(nextProps, nextState){
		// console.log(`nextState: ${JSON.stringify(nextState)}`);
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

	removeFromOrder(key){
		delete this.state.order[key];
		this.setState({order: this.state.order});
	}

	removeFish(key){
		if(confirm("Are you sure you want to remove this item from the menu?")){
			this.state.fishes[key] = null;
				this.setState({fishes: this.state.fishes});
			}
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
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish}/>
			</div>
		);
	}
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));










