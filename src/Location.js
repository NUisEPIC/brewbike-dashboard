import React, { Component } from 'react';
import LocationPicker from './LocationPicker.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Data from './LocationInfo.js';

var styles = {
    textAlign: 'center'
};

class Location extends Component {
    constructor() {
        super();
        this.popSelectionWindow = this.popSelectionWindow.bind(this);
        this.closeSelectionWindow = this.closeSelectionWindow.bind(this);
        this.state = {
            popOut: false,
            locations: []
        }
    }

    popSelectionWindow() {
        this.setState({popOut: true});
    }

    closeSelectionWindow() {
        this.setState({popOut: false});
    }

    componentWillMount() {
        let locations = [];
        for (var id in Data.Data) {
            locations.push(Data.Data[id]);
        }
        this.setState({locations: locations});
    }

    render() {
        console.log(this.state.locations);
        return(
            <div>
            <MuiThemeProvider>
                <h1>
                    Location Info
                </h1>

                <Card style={styles.justifyContent}>
                    <CardHeader 
                    title='Location 1'
                    subtitle='12:00pm - 5pm'
                    titleStyle={styles.textAlign}/>
                    <CardActions>
                        <RaisedButton label='Reset Time' primary={true} onClick={this.popSelectionWindow}/>
                    </CardActions>
                </Card>
                <Card>
                    <CardHeader 
                    title='Location 2'
                    subtitle='1pm - 5pm'/>
                    <CardActions>
                        <RaisedButton label='Reset Time' primary={true} onClick={this.popSelectionWindow}/>
                    </CardActions>
                </Card>
                <LocationPicker popOut={this.state.popOut} closeSelectionWindow={this.closeSelectionWindow}/>
            </ MuiThemeProvider>
            </ div>
        );
    }
}

export default Location;