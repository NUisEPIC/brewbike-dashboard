import React, { Component } from 'react';
import logo from './Logo_White_Watermark.png';
import './css/App.css';
import Location from './components/Location.js';
import Notifications from './components/Notifications.js';
import Activities from './components/Activities.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activities: []};
    this.newActivity = this.newActivity.bind(this);
  }

  newActivity(description, time, person) {
    let newActivity = {
      key: this.state.activities.length+1,
      description: description,
      time: time,
      person: person
    }
    this.setState((prevState, props) => {
      return {
        activities: prevState.activities.concat(newActivity)
      };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} />
        </header>
        <div className="flex-container">
          <div className="flex-item">
            <Location newActivity = {this.newActivity} />
          </div>
          <div className="flex-item">
            <Notifications newActivity = {this.newActivity} />
          </div>
          <div className="flex-item">
            <Activities activities = {this.state.activities} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
