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
  return dateobj.format("dddd, MMM D  h:mm A");
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
                                        <ListItem
                                          className='listItem'
                                          style={{
                                            padding: '20px 16px 0px'
                                          }}
                                          primaryText={
                                              <div className="list-flex-item, listUser">
                                                {person["Name"]}
                                              </div>
                                          }
                                          secondaryText={
                                            <p>
                                              <span className="listMessage">
                                                {person["Change"]}
                                              </span><br/>
                                            </p>
                                          }
                                          disabled={true}/>
                                        <ListItem
                                          className="listTime"
                                          style={{
                                            padding: '0px 16px 16px',
                                          }}
                                          secondaryText={
                                              <div>
                                                {formatTime(person["Time"])}
                                              </div>
                                            }
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
