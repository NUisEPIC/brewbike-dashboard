import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import {data} from '../fakedata/fakenotifications.js';
import {List, ListItem} from 'material-ui/List';
import moment from 'moment'
import '../css/Notifications.css';
import Subheader from 'material-ui/Subheader';
import {darkBlack} from 'material-ui/styles/colors';

function formatTime(string) {
  var dateobj = moment(string);
  return dateobj.format("dddd, MMM D  h:mm A");
}
const today = new Date();

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,                                                              // Whether the snackbar is open or not
      currentMsg: null,                                                         // The message to send
      currentDate: null,                                                        // The current Date object to send
      snackMsg: '',                                                             // The Snackbar Message
      _bufferDate: today,                                                       // A temporary date object (Used to update currentDate)
      json_list: null
    };
  }

  componentDidMount(){
    // TODO
    // handler for getting notifications to initially populate the list items
    fetch('http://localhost:2000/v1/notifications?Limit=5')
    // Trying to just fetch the data in the first place.
    .then((res) => {
      // After fetching the JSON object update the state
      this.setState({
        json_list: res,
        open: true,
        snackMsg: "Mounted!"
      });
    })
    .catch((err) => {
      console.error(err)
    })
  }

  // Function called when "save" button is pressed"
  _handleSaveButton = (e) => {

    // User forgot to fill out message
    if (this.state.currentMsg == '' || this.state.currentMsg == null){
      this.setState({
        open:true,
        snackMsg: "Message cannot be empty"
      })
      return;
    }

    // User forgot to fill out date or time
    if (this.state.currentDate == null){
      this.setState({
        open: true,
        snackMsg: "Please fill out the date and time"
      })
      return;
    }
    // No errors...thus we are safe to proceed and send data to the backend
    fetch('http://localhost:2000/v1/notify',                                    // making post request to notify
    {
      method: 'POST',
      body: JSON.stringify({
        notify_time: this.state.currentDate,
        text: this.state.currentMsg,
        user: " "          // Temporary placeholder
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      this.setState({
        open: true,
        snackMsg: "Message saved"
      })
    })
    .catch((err) => {
      console.error(err)
      this.setState({
        open: true,
        snackMsg: `ERROR: ${err}\n`
      })
    })
  };

  // Function called when "cancel" button pressed
  _handleCancelInfo = () => {
    // Resets the state of the notification form
    this.setState({
      currentMsg: '',
      currentDate: null,
      snackMsg: "Message Cancelled",
      open:true
    });
  };

  // Function to close snackbar
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  // Function called when datepicker changes
  _onChangeDate =(event, date) => {

    // Changes the states of _bufferDate, a temporary date object
    this.state._bufferDate.setFullYear(date.getFullYear());
    this.state._bufferDate.setMonth(date.getMonth());
    this.state._bufferDate.setDate(date.getDate());
    var _bufferDate = this.state._bufferDate;

    // Updates the state of currentDate
    this.setState({
      currentDate: _bufferDate
    });
  };
  // Function called when the time changes
  _onChangeTime = (event,date) => {
    this.state._bufferDate.setHours(date.getHours());
    this.state._bufferDate.setMinutes(date.getMinutes());
    this.state._bufferDate.setSeconds(date.getSeconds());
    this.state._bufferDate.setMilliseconds(date.getMilliseconds())
    var _bufferDate = this.state._bufferDate;

    // Updates the state of currentDate to the user inputed time
    this.setState({
      currentDate: _bufferDate
    });
  };
  render() {
    return (
      <div>
        <h1>
          Notifications
        </h1>
        <div>
          <MuiThemeProvider>
            <div>
              <TextField
                floatingLabelText = "Your Message"
                multiLine = {true}
                rows = {2}
                value = {this.state.currentMsg}
                onChange={(e, newMessage) => this.setState({currentMsg: newMessage})}
                /> <br />
              <DatePicker
                hintText="What day should we send it?"
                onChange={this._onChangeDate}
                value = {this.state.currentDate}
                minDate={new Date()}
                firstDayOfWeek={0}
                />
              <TimePicker hintText ="When?"
                minutesStep={5}
                onChange = {this._onChangeTime}
                value = {this.state.currentDate}
                />
              <RaisedButton
                label="Cancel"
                secondary={true}
                className="button"
                onClick = {this._handleCancelInfo}/>
              <RaisedButton
                label="Save Message"
                primary={true}
                className="button"
                onClick = {this._handleSaveButton}/>
              <Snackbar
                open ={this.state.open}
                message = {this.state.snackMsg}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}/>
            </div>
            <Divider />
            <h1>In Queue</h1>
            <div>
              <List className="list">
                <Subheader>Today</Subheader>
                {data.map(function(outbound_msg){
                  return (
                    <div>
                      <ListItem
                        className = 'listItem'
                        primaryText= {outbound_msg["Message"]}
                        secondaryText={
                          <p>
                            <span
                              className="listTime"
                              style={{color:darkBlack}}>Delivering on {formatTime(outbound_msg["Time"])} </span><br/>
                            {outbound_msg["Message"]}
                          </p>
                        }
                        secondaryTextLines={2}
                        />
                      <Divider/>
                    </div>
                  )
                })}
              </List>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Notification;
