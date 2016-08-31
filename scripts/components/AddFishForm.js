import React, {Component} from 'react';
import h from '../helpers';


export default class AddFishForm extends Component {

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