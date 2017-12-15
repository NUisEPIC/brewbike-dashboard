import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

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
    

    // helps add location
    buttonOnClickHandler = (e) => {
        // TODO
    }
    
    render() {
        return (
            <div>
                <h1>
                    Shop Info
                </h1>
                Click on shop to edit or remove
                <br/><br/>
                <MuiThemeProvider>
                    <LocationItem location="Test location" open="an opening time" close="a closing time" />
                    <LocationItem location="Test location 2" open="an opening time" close="a closing time" />
                    <RaisedButton label="Add Shop" primary={true} fullWidth={false} style={{margin:12}}
                        onClick={this.buttonOnClickHandler}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Location;