import React, {Component} from 'react'

class Map extends Component {

  componentDidMount() {   
    let self = this;
    loadScript("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB9fNq9GDTrseLddWuSLl2xS44uReyBH7k", function() {
      console.log('ready to render', self);
      self.map = new window.google.maps.Map(self.refs.map, { center: {lat: 41.8986, lng: 12.4769},  zoom: 13 });
    });
}   

	render(){

		return(

			<div style={{ height: `100%`, width: '100%' }}>
				<div ref="map"  style={{ height: `100%` }}>
				hello
				</div>
			</div>
      		
		)
	}
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

export default Map