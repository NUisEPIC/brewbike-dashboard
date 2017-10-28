import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class LocationPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {popOut} = this.props;
        if (popOut) {
            return (
                <div>
                    <MuiThemeProvider>
                        <Dialog title="Update Location" open={popOut} 
                        onRequestClose={this.props.closeSelectionWindow}>
                            <RaisedButton label={"close"} onClick={this.props.closeSelectionWindow} />
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default LocationPicker;