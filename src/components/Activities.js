import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import '../css/Activities.css';
//import {data} from '../fakedata/fakeactivites.js';
import moment from 'moment'


class Activities extends Component {
   constructor(props) {
     super(props);
     this.formatTime = this.formatTime.bind(this);
   }

  formatTime(string) {
    var dateobj = moment(string);
    return dateobj.format("dddd, MMM D  h:mm A");
  }

  render() {
    const {activities, clearActivities} = this.props;
      return (
        <div>
          <h1>
              Recent Activity
          </h1>
          <MuiThemeProvider>
            <div>
            <List className="list" style={{maxHeight:'50vh', overflow: 'auto'}}>
              {
                activities.map((person) =>
                  <div key={person.key}>
                    <ListItem
                      className='listItem'
                      style={{
                        padding: '20px 16px 0px'
                      }}
                      primaryText={
                          <div className="list-flex-item, listUser">
                            {person.person}
                          </div>
                      }
                      secondaryText={
                        <p>
                          <span className="listMessage">
                            {person.description}
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
                            {this.formatTime(person.time)}
                          </div>
                        }
                    disabled={true}/>
                  <Divider/>
                  </div>
                )
              }
            </List>
            <FlatButton
              label = "clear activities"
              primary = {true}
              onClick = {clearActivities}
            />
            </div>
        </MuiThemeProvider>
        </div>
      );
  }
}

export default Activities;
