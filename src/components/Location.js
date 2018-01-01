import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import grey400 from 'material-ui/styles/colors';

import '../css/Location.css';

const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="edit / delete"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
);

const RightIconMenu = (props) => (
    <IconMenu iconButtonElement={iconButtonElement} style={{float:"right"}}>
      <MenuItem onClick={props.editClick.bind(this, props.itemId)}>Edit</MenuItem>
      <MenuItem onClick={props.deleteClick.bind(this, props.itemId)}>Delete</MenuItem>
    </IconMenu>
);

class LocationItem extends Component {

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
                    rightIconButton={<RightIconMenu editClick={this.props.editClick} deleteClick={this.props.deleteClick} itemId={this.props.itemId} />} // passing reference to parent location item
                    // onClick={this.props.onClick}
                    disabled={true}
                />
                <Divider/>
            </div>
        );
    }

}

class Location extends Component {

    constructor(props) {
        super(props);

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

    loadShops() {
        fetch('/v1/shops.json', {
            method: 'GET'
        })
        .then( (res) => {
            console.log(res); // debugging statement
            res.json().then( (data) => {
                console.log(data); // debugging statement
                this.setState({locations: data.shops});
            })
        })
        .catch( (err) => {
            console.error(err); // debugging statement
        });
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
            this.loadShops() // load shops again to reflect the added shop
        })
        .catch( (err) => {
            console.error(err)
        })
    }

    // helps edit location details
    editItemOnClickHandler = (itemId, e) => {
        console.log(itemId); // debugging statement

    }

    // helps delete location details
    deleteItemOnClickHandler = (itemId, e) => {
        console.log(itemId); // debugging statement
        fetch(`/v1/shops/${itemId}`,
        {
            method:'DELETE',
            // type:'cors'
        })
        .then( (res) => {
            console.log(res);
            this.loadShops() // load shops again to reflect the added shop
        })
        .catch( (err) => {
            console.error(err)
        })
    }

    componentDidMount() {
        this.loadShops();
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
                <br/><br/>
                <MuiThemeProvider>

                    {this.state.locations.map(element => // this is the for loop that dynamically generates new shop items
                        <LocationItem location={element.location} open={element.start_time} close={element.end_time}
                            editClick={this.editItemOnClickHandler}
                            deleteClick={this.deleteItemOnClickHandler}
                            itemId={element._id}
                        />
                    )}

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
