import React, {Component} from 'react';
import ReactRouter, {Router, Route, Navigation, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import h from '../helpers';
import reactMixin from 'react-mixin';
// import autobind from 'autobind-decorator';

// @autobind
export default class StorePicker extends Component {

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


// reactMixin.onClass(StorePicker, Navigation);

