import React, {Component} from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
	render(){

		const GoogleMapComponent = withGoogleMap(props => (
      		<GoogleMap
        	defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        	defaultZoom = { 13 }
      		>
      		</GoogleMap>
   		));

		return(
			<section className='map-container'>
        		<GoogleMapComponent
          			containerElement={ <div style={{ height: `100%`, width: '100%' }} /> }
          			mapElement={ <div style={{ height: `100%` }} /> }
        		/>
      		</section>
		)
	}
}

export default Map