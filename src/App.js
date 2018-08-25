import React, { Component } from 'react';
import ListVenues from './ListVenues'
import Map from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <button id="sidebarToggler" aria-pressed="false" aria-expanded="false" aria-label="Sidebar button" onclick="toggleSidebar()">
            &#9776;
          </button>
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <ListVenues />
        <Map />
       </div>
    );
  }
}

export default App;
