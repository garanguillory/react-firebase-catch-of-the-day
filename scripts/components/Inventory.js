import React, {Component} from 'react';
import h from '../helpers';
import AddFishForm from './AddFishForm';




export default class Inventory extends Component {

	 static propTypes = { 
		 	addFish: React.PropTypes.func.isRequired,
		 	loadSamples: React.PropTypes.func.isRequired,
		 	fishes: React.PropTypes.object.isRequired,
		 	linkState: React.PropTypes.func.isRequired,
		 	removeFish: React.PropTypes.func.isRequired
	};

	constructor(props){
		super(props)

		this.renderInventory = this.renderInventory.bind(this);
	}

	renderInventory(key){
		var linkState = this.props.linkState;
		return (
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState(`fishes.${key}.name`)}/>
				<input type="text" valueLink={linkState(`fishes.${key}.price`)}/>
				<select valueLink={linkState(`fishes.${key}.status`)}>
					<option value="unavailable">Sold Out!</option>
					<option value="available">Fresh!</option>
				</select>
				<textarea valueLink={linkState(`fishes.${key}.description`)}></textarea>
				<input type="text" valueLink={linkState(`fishes.${key}.image`)}/>
			{/*<button onClick={this.props.removeFish.bind(null,key)}>Remove Fish</button>*/}
			<button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
			</div>
		);
	}

	render(){
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm {...this.props}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		);
	}

}