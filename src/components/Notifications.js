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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import grey400 from 'material-ui/styles/colors';

function formatTime(string) {
  var dateobj = moment(string);
  return dateobj.format("dddd, MMM D  h:mm A");
}
const today = new Date();


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="delete"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

//currently this is breaking atm! Havent fully implemented the delete function either.
const RightIconMenu = (props) => (
    <IconMenu iconButtonElement={iconButtonElement} style={{float:"right"}}>
      <MenuItem onClick = {props.deleteClick.bind(this, props.itemId)}>Delete</MenuItem>
    </IconMenu>
);

// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

// const RightIconMenu = (props) => (
//     <IconMenu iconButtonElement={iconButtonElement} style={{float:"right"}}>
//       <MenuItem>Delete</MenuItem>
//     </IconMenu>
// );




class NotificationItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ListItem
                    className='listItem'
                    primaryText={
                        <div className="list-flex-item, listUser">
                          On {formatTime(this.props.time)}
                        </div>
                    }
                    secondaryText={
                      <p>
                        <span className="listMessage"> {this.props.message} </span>
                        <br/>
                      </p>
                    }
                    secondaryTextLines={2}
                    rightIconButton={<RightIconMenu deleteClick={this.props.deleteClick} itemId={this.props.itemId} />} // passing reference to parent location item
                    // onClick={this.props.onClick}
                    disabled={true}
                />
                <Divider/>
            </div>
        );
    }

}
class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,                                                              // Whether the snackbar is open or not
      currentMsg: null,                                                         // The message to send
      currentDate: null,                                                        // The current Date object to send
      snackMsg: '',                                                             // The Snackbar Message
      _bufferDate: today,                                                       // A temporary date object (Used to update currentDate)
      messages: []
    }
  }
  loadNotifications(){
    fetch('/v1/notifications?limit=10', {
      method: 'GET'
    })
    .then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log(data);
        this.setState({messages: data});
      })
    })
    .catch((err) => {
      console.error(err);
    });
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
    fetch('v1/notify',                                    // making post request to notify
    {
      method: 'POST',
      body: JSON.stringify({
        notify_time: this.state.currentDate,
        text: this.state.currentMsg,
        user: "Admin"          // Temporary placeholder
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      console.log(this.state.currentDate)
      this.loadNotifications()
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

  // TODO - once inQueue backend functionality is implemented
  _handleDeleteItemOnClick = (itemId) => {
    console.log(itemId); // debugging statement
  }

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
  }

  componentDidMount() {
    this.loadNotifications();
  }

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
            {this.state.messages.map(element =>
            <NotificationItem message={element.text} time = {element.notify_time}
            user={element.user}
          itemId={element._id}
          deleteClick = {this._handleDeleteItemOnClick}
        />
    )}
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Notification;
