import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

import '../css/Location.css';

class LocationItem extends Component {

    // helps edit location details
    locationItemOnClickHandler = (e) => {
        // TODO
    }

    render() {
        return (
            <div>
                <ListItem
                    className='listItem'
                    primaryText={
                        <div className="list-flex-item, listUser">
                          {this.props.location}
                        </div>
                    }
                    secondaryText={
                      <p>
                        Opens: <span className="listTime"> {this.props.open} </span>
                        <br/>
                        Closes: <span className="listTime"> {this.props.close} </span>
                      </p>
                    }
                    secondaryTextLines={2}
                    onClick={this.locationItemOnClickHandler}
                />
                <Divider/>
            </div>
        );
    }

}

class Location extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            canSubmit:false, // for the submit button for the add shop modal
            errorText:"All fields are required",
            hasStart:false, // for timePicker for the add shop modal
            hasEnd:false, // for timePicker for the add shop modal
            pickedStartTime: null, // to store the times being picked
            pickedEndTime: null,
            pickedLocation: null,
            locations: []
        }
    }

    // for the add location modal
    handleOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClose = () => {
        this.setState({modalOpen: false, errorText: "All fields are required", hasStart: false, hasEnd: false});
    };

    // handler for submitting location
    submitLocationHandler = (e) => {
        // TODO
        this.handleClose(); // closing modal
        fetch('/v1/addshop', // making post request to add shop
        {
            method:'POST',
            body: JSON.stringify({
                start_time: this.state.pickedStartTime,
                end_time: this.state.pickedEndTime,
                location: this.state.pickedLocation
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then( (res) => {
            console.log(res);
        })
        .catch( (err) => {
            console.error(err)
        })
    }

    render() {

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              disabled={!(!this.state.errorText && this.state.hasStart && this.state.hasEnd)}
              onClick={this.submitLocationHandler}
            />,
          ];

        return (
            <div>
                <h1>
                    Shop Info
                </h1>
                Click on shop to edit or remove
                <br/><br/>
                <MuiThemeProvider>
                    {/* <LocationItem location="Test location" open="an opening time" close="a closing time" />
                    <LocationItem location="Test location 2" open="an opening time" close="a closing time" /> */}
                    <RaisedButton label="Add Shop" primary={true} fullWidth={false} style={{margin:12}}
                        onClick={this.handleOpen}
                    />
                    <Dialog
                        title="New Shop"
                        actions={actions}
                        modal={true}
                        open={this.state.modalOpen}
                    >
                        <TextField
                            hintText="Enter shop location"
                            errorText={this.state.errorText}
                            floatingLabelText="Shop Location"
                            onChange={(e, val) => {
                                if (val) {
                                    this.setState({errorText: null, pickedLocation: val})
                                } else {
                                    this.setState({errorText: "All fields are required", pickedLocation: val})
                                }
                            }}
                        /><br />
                        <TimePicker
                            hintText="Opening Time"
                            onChange={(e, date) => {
                                if (date !== null) {
                                    this.setState({hasStart: true, pickedStartTime: date})
                                } else {
                                    this.setState({hasStart: false, pickedStartTime: date})
                                }
                            }}
                        /><br/>
                        <TimePicker
                            hintText="Closing Time"
                            onChange={(e, date) => {
                                if (date) {
                                    this.setState({hasEnd: true, pickedEndTime: date})
                                } else {
                                    this.setState({hasEnd: false, pickedEndTime: date})
                                }
                            }}
                        />
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Location;
