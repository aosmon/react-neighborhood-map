import React, { Component } from 'react'
import {venues} from './VenuesData'
import ListVenues from './ListVenues'
import Map from './Map.js'
import './App.css'

class App extends Component {

  state = {
    sidebarVisible: true,
  }

  toggleSidebar = () => {
    this.setState((prevState)=>({
      sidebarVisible: !prevState.sidebarVisible
    }))
  }

  render() {

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
          <ListVenues venues={venues}/>
          </section>
          <section className='map-container' style={this.state.sidebarVisible?{marginLeft: '250px'}:{marginLeft: '0'}}>
            <Map />
          </section>
        </main>
       </div>
    );
  }
}

export default App;
