import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import './Notifications.css';

const today = new Date();
const temporary = new Date();

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      open: false,
      date: temporary,
      _bufferDate: temporary,
      _tempMsg: '',
    };
  }
  _handleSaveButton =(e) => {
    var _bufferDate = this.state._bufferDate;
    var _tempMsg = this.state._tempMsg;
      this.setState({
        date: _bufferDate,
        open: true,
        message: _tempMsg,
      });
        // alert(`Your Message: \n\n` + `${this.state.message}\n \n` + `This message will be delivered on:\n\n${this.state.date}`)
  };
  _handleCancelInfo = () => {
    this.setState({
      message: '',
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  _onChangeDate =(event, date)=> {
    this.state._bufferDate.setFullYear(date.getFullYear());
    this.state._bufferDate.setMonth(date.getMonth());
    this.state._bufferDate.setDate(date.getDate());
  };

  _onChangeTime =(event,date) => {
    this.state._bufferDate.setHours(date.getHours());
    this.state._bufferDate.setMinutes(date.getMinutes());
    this.state._bufferDate.setSeconds(date.getSeconds());
    this.state._bufferDate.setMilliseconds(date.getMilliseconds())};

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
                value = {this.state._tempMsg}
                onChange={(e, newMessage) => this.setState({_tempMsg: newMessage})}
                /> <br />
              <DatePicker
                hintText="What day should we send it?"
                onChange={this._onChangeDate}
                minDate={today}
                firstDayOfWeek={0}
                />
              <TimePicker hintText ="When?"
                minutesStep={5}
                onChange = {this._onChangeTime}/>
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
                message = "Information Saved!"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}/>
            </div>
          <Divider />
            <h1>In Queue</h1>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Notification;
