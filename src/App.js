import React, { Component } from 'react'
import {venues} from './VenuesData'
import ListVenues from './ListVenues'
import Map from './Map.js'
import './App.css'

class App extends Component {

  state = {
    sidebarVisible: true,
    markers: [],
    query: ''    
  }

  toggleSidebar = () => {
    this.setState((prevState)=>({
      sidebarVisible: !prevState.sidebarVisible
    }))
  }

  updateQuery = (query) => {
    this.setState(()=>({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  addMarkers = (m) => {
    this.setState(()=>({
      markers: m
    }))
  }

  getInfo = (marker, infowindow, map) => {
    let position = marker.getPosition().lat() + ',' + marker.getPosition().lng();
    let name = marker.title;
    let description = '';  
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=ECBUXCUS5KK1HZKQVKUSYS2HXWTRDB1BTVJMSMS1HE4LWKXU&client_secret=UNTBSGDHF24PTCZW0MBTMOPDYNGEC24XOKB3F0WN4IYL42N5&v=20180323&limit=1&ll='+position+'&query='+name)
    .then(response => response.json())
    .then(function(data){
      let venueID = data.response.groups[0].items[0].venue.id;
      let photoURL = "";
      fetch('https://api.foursquare.com/v2/venues/'+venueID+'?client_id=ECBUXCUS5KK1HZKQVKUSYS2HXWTRDB1BTVJMSMS1HE4LWKXU&client_secret=UNTBSGDHF24PTCZW0MBTMOPDYNGEC24XOKB3F0WN4IYL42N5&v=20180323')
        .then(response => response.json())
        .then(function(data){
          if(data.response.venue.description){
            description = data.response.venue.description;  
          }
          let photo = data.response.venue.photos.groups[1].items[0];
          let photoURL = photo.prefix+'300x300'+photo.suffix;
          let content = '<div class="venue-info"><h3>'+name+'</h3><p>'+description+'</p>';
          content += '<img src="'+photoURL+'" alt="'+name+'"/></div>';
          marker.content = content;
          console.log(marker);
          infowindow.setContent(content);
          infowindow.open(map, marker);          
        })
        .catch(function() {
          description = "Unable to get venue information";
          infowindow.setContent(description)
          infowindow.open(map, marker);
        });
    })  
    .catch(function() {
        description = "Unable to contact server";
        infowindow.setContent(description)
        infowindow.open(map, marker);
    });    
  }

  render() {
    const { query } = this.state

    const showingVenues = query === ''
      ? venues
      : venues.filter((v) => (
        v.name.toLowerCase().includes(query.toLowerCase())
    ))  

    return (

      <div className="App">

        <header className="App-header">
          <button id="sidebarToggler" aria-pressed="false" aria-expanded="false" aria-label="Sidebar button" onClick={this.toggleSidebar}>
            &#9776;
          </button>
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <main>
          <section className={this.state.sidebarVisible?'venues-list-container open': 'venues-list-container'}>
          <div className='list-venues-top'>
          <input className='search-values'
            type='text'
            placeholder='Search Venues'
            value={query}
            onChange={(event)=> this.updateQuery(event.target.value)}
          />
        </div>

        {showingVenues.length !== venues.length && (
          <div className='showing-venues'>
            <span>Now showing {showingVenues.length} of {venues.length}</span>
            <button onClick={this.clearQuery}> Show all </button>
          </div>
        )}

            <ListVenues venues={venues} query={this.state.query} markers={this.state.markers} infowindow={this.state.infowindow}/>
          </section>
          <section>
            <Map venues={venues}  query={this.state.query} addMarkers={this.addMarkers} getInfo={this.getInfo} sidebarVisible={this.state.sidebarVisible}/>
          </section>
        </main>
       </div>
    );
  }
}

export default App;
