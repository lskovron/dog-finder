import React from 'react';

export const AccessabilityMarkup = (props) => {
	return (
		<div style={{position:'absolute',opacity:'0'}}>
		{props.visible.dogs === "visible" ? (
			props.dogs.results.map((dog,index)=>(
				<li key={index} style={{display:'inline-block'}}><a href="#" onBlur={props.markerFocusOut.bind(this)} onFocus={props.markerFocus.bind(this, [dog.longitude,dog.latitude], dog.name )}>{dog.name}</a></li>
			))
		) : null }
		{props.visible.parks === "visible" ? (
			props.parks.results.map((park,index)=>(
				<li key={index} style={{display:'inline-block'}}><a href="#" onBlur={props.markerFocusOut.bind(this)} onFocus={props.markerFocus.bind(this, [park.longitude,park.latitude], park.name )}>{park.name}</a></li>
			))
		) : null }
		</div>
	)
}