import React, { Component } from 'react';
//import logo from './BrewBikeLogo.jpg';
import './App.css';
import Location from './Location.js';
import Notifications from './Notifications.js';
import Activities from './Activities.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<img src={logo} alt='logo' />*/}
          <h1 className="App-title">BrewBike</h1>
        </header>
        <p className="App-intro">
          Welcome to BrewBike!
        </p>
        <div className="flex-container">
          <div className="flex-item">
            <Location/>
          </div>
          <div className="flex-item">
            <Notifications/>
          </div>
          <div className="flex-item">
            <Activities/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
