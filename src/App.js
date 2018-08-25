import React, { Component } from 'react';
import ListVenues from './ListVenues'
import Map from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ListVenues />
        <Map />
       </div>
    );
  }
}

export default App;
