import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import './Activities.css';
import {data} from './fakeactivites.js';
import moment from 'moment'

function formatTime(string) {
  var dateobj = moment(string);
  return dateobj.format("ddd, DD-MMM  hh:mm A");
}

class Activities extends Component {
    render() {
        return (
          <div>
            <h1>
                Recent Activity
            </h1>
            <MuiThemeProvider>
              <div>
              <List className="list" style={{maxHeight:'50vh', overflow: 'auto'}}>
                {data.map(function(person) {
                                    return(
                                      <div>
                                        <ListItem className='listItem'
                                          primaryText={person["Name"]}
                                          secondaryText={
                                            <p>
                                              <span>{formatTime(person["Time"])}</span><br/>
                                              {person["Change"]}
                                            </p>
                                          }
                                          secondaryTextLines={2}
                                          disabled={true}/>
                                        <Divider/>
                                      </div>
                                  )})}
              </List>
              </div>
          </MuiThemeProvider>
          </div>
        );
    }
}

export default Activities;
