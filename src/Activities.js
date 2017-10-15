import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import './Activities.css';

class Activities extends Component {
    render() {
        return (
          <div>
            <h1>
                Recent Activity
            </h1>
            <MuiThemeProvider>
              <List className="list" style={{maxHeight:'50vh', overflow: 'auto'}}>
                <ListItem className='listItem'
                  primaryText = "Louisa"
                  secondaryText = "Sent out a Notification"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Michael"
                  secondaryText = "Changed time of Location 1 "
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
                <ListItem className='listItem'
                  primaryText = "Bryan"
                  secondaryText = "Drank coffee"
                  disabled={true}
                  />
              </List>
          </MuiThemeProvider>
          </div>
        );
    }
}

export default Activities;
