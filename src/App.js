import React, { Component } from 'react';
import logo from './Logo_White_Watermark.png';
import './css/App.css';
import Location from './components/Location.js';
import Notifications from './components/Notifications.js';
import Activities from './components/Activities.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import LoginModal from './components/Authentication.js'




class TopBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = { user: "admin" };
  }

  //TODO
  handleLogout() {
    console.log("Handle logout being called");
  }

  render() {
    return (
      <AppBar
        title={`Welcome, ${this.state.user}!`}
        iconElementRight={<FlatButton label="Logout" onClick={this.handleLogout} />}
      />
    );
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activities: []};
    this.newActivity = this.newActivity.bind(this);
    this.loadActivities = this.loadActivities.bind(this);
    this.clearActivities = this.clearActivities.bind(this);
  }

  newActivity(description, time, person) {
    fetch('v1/addactivity',
    {
      method: 'POST',
      body: JSON.stringify({
        description: description,
        time: time,
        person: person
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
      res.text().then((text) => {
        console.log(text)
      });
    })
    .catch( (err) => {
      console.error(err);
    });
    this.loadActivities();
    /*
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
    */
  }

  loadActivities() {
    fetch('/v1/loadactivities', 
    {
      method: "GET"
    })
    .then((res) => {
      res.json().then((data) => {
        console.log(data);
        this.setState({activities: data});
      })
    })
  }

  clearActivities() {
    fetch('/v1/clearactivities',
    {
      method: "DELETE"
    })
    .then((res) => {
      res.text().then((text) => {
        console.log(text);
        this.loadActivities();
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidUpdate() {
    console.log(this.state.activities);
  }

  componentDidMount() {
    this.loadActivities();
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <TopBar />
        <LoginModal />
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
            <Activities activities = {this.state.activities} clearActivities = {this.clearActivities}/>
          </div>
        </div>
      </div>
      </ MuiThemeProvider>
    );
  }
}

export default App;
