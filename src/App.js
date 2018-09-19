import React, { Component } from 'react'
import {venues} from './VenuesData'
import ListVenues from './ListVenues'
import Map from './Map.js'
import './App.css'

class App extends Component {

  state = {
    sidebarVisible: true,
    markers: [],
    query: '',
    selectedVenue: {}    
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
  //Select venue in the list
  selectVenue = (m) => {
    let options = document.querySelectorAll('[aria-selected="true"]');
    options.forEach(function(o){
      o.setAttribute('aria-selected', 'false');
      o.classList.remove("selected");
    })
    let item = document.getElementById(m.title);
    item.setAttribute('aria-selected', 'true');
    item.classList.add("selected");
  }

  getInfo = (marker, infowindow, map) => {
    let position = marker.getPosition().lat() + ',' + marker.getPosition().lng();
    let name = marker.title;
    let description = '';
    //
    if(!marker.content){ 
      fetch('https://api.foursquare.com/v2/venues/explore?client_id=ECBUXCUS5KK1HZKQVKUSYS2HXWTRDB1BTVJMSMS1HE4LWKXU&client_secret=UNTBSGDHF24PTCZW0MBTMOPDYNGEC24XOKB3F0WN4IYL42N5&v=20180323&limit=1&ll='+position+'&query='+name)
      .then(response => response.json())
      .then(function(data){
        let venueID = data.response.groups[0].items[0].venue.id;
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
            infowindow.setContent(content);
            infowindow.open(map, marker);          
          })
          .catch(function() {
            description = '<div class="venue-info"><p>Unable to get venue information</p></div>';
            infowindow.setContent(description)
            infowindow.open(map, marker);
          });
      })  
      .catch(function() {
          description = '<div class="venue-info"><p>Unable to contact the server</p></div>';
          infowindow.setContent(description)
          infowindow.open(map, marker);
      });
    }
    else{
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);               
    }   
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
          <div className={this.state.sidebarVisible?'sidebar sidebar-open': 'sidebar'}>
            <section className='search-venues-container'>
              <input className='search-venues'
                type='text'
                placeholder='Search Venues'
                value={query}
                onChange={(event)=> this.updateQuery(event.target.value)}
                role="search"
                aria-label="Filter venues"
              />
              {showingVenues.length !== venues.length && (
                <div className='showing-venues'>
                  <span>Now showing {showingVenues.length} of {venues.length}</span>
                  <button onClick={this.clearQuery}> Show all </button>
                </div>
              )}
            </section>        
            <ListVenues 
              venues={venues} 
              query={this.state.query} 
              markers={this.state.markers} 
              infowindow={this.state.infowindow}
              selectVenue={this.selectVenue}
              sidebarVisible={this.state.sidebarVisible}
            />            
          </div>
            <Map
              venues={venues}
              query={this.state.query}
              addMarkers={this.addMarkers}
              getInfo={this.getInfo}
              selectVenue={this.selectVenue}
              sidebarVisible={this.state.sidebarVisible}/>
        </main>
       </div>
    );
  }
}

export default App;
