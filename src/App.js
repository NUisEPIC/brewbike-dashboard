import React, { Component } from 'react';
import logo from './Logo_White_Watermark.png';
import './App.css';
import Location from './Location.js';
import Notifications from './Notifications.js';
import Activities from './Activities.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} />
        </header>
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
