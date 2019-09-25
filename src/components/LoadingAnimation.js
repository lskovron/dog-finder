import React from 'react';
import gif from '../assets/runningDog.gif';


export const LoadingAnimation = () => {
	return (
		<header>
			<img src={gif} alt="running dog animation" />
			<h1>Dog Finder</h1>
			<p>By Leo Skovron</p>
		</header>
	)
	
}