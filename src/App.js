import React, { Component } from 'react';
import logo from './Logo_White_Watermark.png';
import './css/App.css';
import Location from './components/Location.js';
import Notifications from './components/Notifications.js';
import Activities from './components/Activities.js';

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
