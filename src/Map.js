import React, {Component} from 'react'

let markers = [];

class Map extends Component {

  componentDidMount() {   
    let self = this;

    const {venues, addMarkers} = this.props;
      
    loadScript("https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB9fNq9GDTrseLddWuSLl2xS44uReyBH7k", function() {
      
      self.map = new window.google.maps.Map(self.refs.map, { center: {lat: 41.8986, lng: 12.4769},  zoom: 13 });
      self.infowindow = new window.google.maps.InfoWindow({
        content: "",
        maxWidth: 100
      });

      venues.map((venue)=>{
        const marker = new window.google.maps.Marker({
          position: venue.latlng,
          title: venue.name,
          map: self.map,
          animation: window.google.maps.Animation.DROP}
        );
        marker.addListener('click', function(){
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){marker.setAnimation(null);}, 1000);
          self.infowindow.setContent(venue.name);
          self.infowindow.open(self.map, marker);
        });
        markers.push(marker);
        return marker;
      })
      addMarkers(markers);
    });
  }   

  componentDidUpdate() {
    let self = this;

    const {query} = this.props;

    if(query !== ''){
      markers.forEach((marker)=>{marker.setMap(null)});
      markers.filter((m) => (
        m.title.toLowerCase().includes(query.toLowerCase())
      )).map((m)=>(m.setMap(self.map)))  

    }
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
    // Adding the script tag to the head
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