import React from 'react';
import mapboxgl from 'mapbox-gl';

export class Map extends React.Component {
	constructor(props){
		super(props);
		this.mapInteraction = this.mapInteraction.bind(this);
	}

	render(){
		return (
			<div id="DogFinderMap"></div>
		)		
	}

	componentDidMount(){
		mapboxgl.accessToken = 'pk.eyJ1IjoibHNrb3Zyb24iLCJhIjoiY2sweTBpaWx0MGJpZjNicnk4OXB3OTRidSJ9.hKbbKBMyCQMfu9DPR-_FwQ';
		this.map = new mapboxgl.Map({
			container: 'DogFinderMap',
			style: 'mapbox://styles/mapbox/outdoors-v10',
			center: [-97.74306,30.26715], // start in Austin
			zoom: 0
		});


		let dogsTemplate = {
			"id":"dogs",
			"type": "symbol",
			"source": {
				"type": "geojson",
				"data": {
					"type": "FeatureCollection",
					"features": []
				}
			},
			"layout": {
				"visibility": this.props.visible.dogs,
				"icon-image": "{icon}-15",
				"icon-allow-overlap": true
			}
		}
		let parksTemplate = {
			"id":"parks",
			"type": "symbol",
			"source": {
				"type": "geojson",
				"data": {
					"type": "FeatureCollection",
					"features": []
				}
			},
			"layout": {
				"visibility": this.props.visible.parks,
				"icon-image": "{icon}-15",
				"icon-allow-overlap": true
			}
		}


		const mapDataToLayerObject = (obj,array,icon) => {
			array.map((entry)=>(
				obj.source.data.features.push(
					{
						"type": "Feature",
						"properties": {
							"description": entry.name,
							"icon": icon
						},
						"geometry": {
							"type": "Point",
							"coordinates": [entry.longitude, entry.latitude]
						}
					}
				)
			))

			return obj;
		}

		let dogLayer = mapDataToLayerObject(
			dogsTemplate, //template object
			this.props.dogs.results, //API data - dogs
			"veterinary" //icon
		);
		let parksLayer = mapDataToLayerObject(
			parksTemplate, //template object
			this.props.parks.results, //API data - parks
			"park" //icon
		);
		

		this.map.on("load",()=>(
			this.map.addLayer(dogLayer),
			this.map.addLayer(parksLayer),
			this.mapInteraction()
		))





	}

	componentDidUpdate(){

		//toggle visibility based on state
		this.props.visible.dogs === "visible" ? this.map.setLayoutProperty("dogs", 'visibility', 'visible') 
		: this.map.setLayoutProperty("dogs", 'visibility', 'none');

		this.props.visible.parks === "visible" ? this.map.setLayoutProperty("parks", 'visibility', 'visible') 
		: this.map.setLayoutProperty("parks", 'visibility', 'none');
		
		
	}

	mapInteraction = () => {


		const addPopup = (coord,desc) => {
			let popup = new mapboxgl.Popup({
				closeButton: false,
				offset: 10
			});
			popup.setLngLat(coord)
				.setHTML(desc)
				.addTo(this.map);

			this.map.flyTo({center: coord});
		}

		const findNearest = (coord) => {

			let arr = [...this.props.parks.results];
			let copy = [];
			
			arr.forEach(function(el){
				let length = window.turf.length({type: 'Feature',
				  properties: {},
				  geometry: {
				    type: 'LineString',
				    coordinates: [					//format:
				      [el.longitude, el.latitude],  //[49,-30],
				      coord                         //[88,-20]
				    ]
				  }
				}, {units: 'miles'});
				copy.push({name:el.name,distance:length});
			})
			let closestPark = copy.reduce(function (closest, entry) {
			  return closest.distance < entry.distance ? closest : entry;
			}, {});

			alert("Closest Park: "+closestPark.name+". Distance: "+closestPark.distance+" miles");

		}


		this.map.on('mouseenter', 'dogs', () => this.map.getCanvas().style.cursor = 'pointer');
		this.map.on('mouseleave', 'dogs', () => this.map.getCanvas().style.cursor = '' );

		this.map.on('mouseenter', 'parks', () => this.map.getCanvas().style.cursor = 'pointer');
		this.map.on('mouseleave', 'parks', () => this.map.getCanvas().style.cursor = '' );

		this.map.on('click', 'dogs', function (e) {
			let coordinates = e.features[0].geometry.coordinates.slice();
			let description = e.features[0].properties.description;
			 
			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			addPopup(coordinates,description);

			findNearest(coordinates);
			 
		});

		this.map.on('click', 'parks', function (e) {
			let coordinates = e.features[0].geometry.coordinates.slice();
			let description = e.features[0].properties.description;
			 
			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			addPopup(coordinates,description);
			 
		});
	}

}