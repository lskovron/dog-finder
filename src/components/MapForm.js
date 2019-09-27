import React from 'react';

export class MapForm extends React.Component {
	constructor(props) {
	    super(props)
	    this.handleChange = this.handleChange.bind(this)
	    this.handleClick = this.handleClick.bind(this)
	}

	handleChange = (e) => {
		e.preventDefault();
		let selected = e.target.selectedOptions[0].value;
		this.props.toggleLayers(selected);
		
	}

	handleClick = (e) => {
		e.preventDefault();
		document.getElementById('mapHandler').focus();
		
	}

	render() {
		return(
			<div style={{position:'relative'}}>
				<form className="mapForm" style={{position:'relative',zIndex:1}}>
					<p>I'm looking for </p>
					<label htmlFor="show-on-map" className="hidden">What would you like to display on the map?</label>
					<select id="mapHandler" name="show-on-map" onChange={this.handleChange}>
						<option value='both'>dogs & parks</option>
						<option value='dogs'>dogs</option>
						<option value='parks'>parks</option>
					</select>
				</form>
				<a id="tabbableMap" href="#" onClick={this.handleClick}>Skip map markers</a>
			</div>
		)
	}
}