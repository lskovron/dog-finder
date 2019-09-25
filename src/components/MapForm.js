import React from 'react';

export class MapForm extends React.Component {
	constructor(props) {
	    super(props)
	    this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (e) => {
		e.preventDefault();
		let selected = e.target.selectedOptions[0].value;
		this.props.toggleLayers(selected);
		
	}

	render() {
		return(
			<form className="mapForm" style={{position:'relative',zIndex:1}}>
				<p>I'm looking for </p>
				<select onChange={this.handleChange}>
					<option value='both'>dogs & parks</option>
					<option value='dogs'>dogs</option>
					<option value='parks'>parks</option>
				</select>
			</form>
		)
	}
}