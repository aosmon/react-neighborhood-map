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
    infowindow: {}
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

  addInfoWindow = (i) => {
    this.setState(()=>({
      infowindow: i
    }))
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
          <section className='map-container' style={this.state.sidebarVisible?{marginLeft: '250px'}:{marginLeft: '0'}}>
            <Map venues={venues}  query={this.state.query} addMarkers={this.addMarkers} addInfoWindow={this.addInfoWindow}/>
          </section>
        </main>
       </div>
    );
  }
}

export default App;
