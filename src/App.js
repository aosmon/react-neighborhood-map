import React, { Component } from 'react'
import ListVenues from './ListVenues'
import Map from './Map'
import './App.css'

const venues = [
  {
    "id": 1,
    "name": "Colosseum",
    "latlng": {
      "lat": 41.890251,
      "lng": 12.492373
    }
  }, {
    "id": 2,
    "name": "St. Peter's Basilica",
    "latlng": {
      "lat": 41.9022,
      "lng": 12.4539
    }
  }, {
    "id": 3,
    "name": "Pantheon",
    "latlng": {
      "lat": 41.8986,
      "lng": 12.4769
    } 
  }, {
    "id": 4,
    "name": "Trevi Fountain",
    "latlng": {
      "lat": 41.9009,
      "lng": 12.4833
    }
 }, {
    "id": 5,
    "name": "Roman Forum",
    "latlng": {
      "lat": 41.8925,
      "lng": 12.4853
    }
  }, {
    "id": 6,
    "name": "Vatican Museums",
    "latlng": {
      "lat": 41.9065,
      "lng": 12.4536
    }
  }, {
    "id": 7,
    "name": "Piazza Navona",
    "latlng": {
      "lat": 41.9065,
      "lng": 12.4536
    }
  }, {
    "id": 8,
    "name": "Sistine Chapel",
    "latlng": {
      "lat": 41.9029,
      "lng": 12.4545
    }
  }, {
    "id": 9,
    "name": "Archbasilica of St. John Lateran",
    "latlng": {
      "lat": 41.8859,
      "lng": 12.5057
    }
  }, {
    "id": 10,
    "name": "Castel Sant'Angelo",
    "latlng": {
      "lat": 41.9031,
      "lng": 12.4663
    }
  }, {
    "id": 11,
    "name": "St. Peter's Square",
    "latlng": {
      "lat": 41.9022,
      "lng": 12.4568
    }
  }, {
    "id": 12,
    "name": "Piazza del Popolo",
    "latlng": {
      "lat": 41.9107,
      "lng": 12.4764
    }
  }, {
    "id": 13,
    "name": "Baths of Caracalla",
    "latlng": {
      "lat": 41.8790,
      "lng": 12.4924
    }
  }]

class App extends Component {

  state = {
    sidebarVisible: true
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
