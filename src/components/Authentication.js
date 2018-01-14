import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }
    
    // TODO
    handleLoginClick = (e) => { 
        console.log("Login button was clicked!")
    }

    render() {
        return (
            <div>
                <TextField
                hintText="Enter your registered email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({username:newValue})}
                fullWidth = {true}
                />
                <br/>
                <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                fullWidth = {true}
                />
                <br/><br/>
                <RaisedButton label="Login" primary={true} onClick={(event) => this.handleLoginClick(event)}/>
                <br/><br/>
                Employee, but don't have an account?
                <FlatButton label="Register Here" secondary={true} onClick={(event) => this.props.onRegisterClick(event)}/>
            </div>
        );
    }

}

class Signup extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }

    // TODO
    handleSubmitClick = (e) => {
        console.log("Submit button for register was clicked!")
    }

    render() {
        return (
            <div>
            <TextField
                hintText="Enter your First Name"
                floatingLabelText="First Name"
                onChange = {(event,newValue) => this.setState({first_name:newValue})}
                fullWidth = {true}
                />
            <br/>
            <TextField
                hintText="Enter your Last Name"
                floatingLabelText="Last Name"
                onChange = {(event,newValue) => this.setState({last_name:newValue})}
                fullWidth = {true}
                />
            <br/>
            <TextField
                hintText="Enter your Email"
                type="email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                fullWidth = {true}
                />
            <br/>
            <TextField
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                fullWidth = {true}
                />
            <br/><br />
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmitClick(event)}/>
            <br/><br />
            Made a mistake? Back to
            <FlatButton label="Login" secondary={true} onClick={(event) => this.props.onLoginClick(event)}/>
          </div>
        );
    }
}

export default class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            signup: false
        }
        this.onRegisterClick.bind(this);
        this.onLoginClick.bind(this);
    }

    onRegisterClick = (e) => {
        this.setState({signup:true});
    }
    onLoginClick = (e) => {
        this.setState({signup:false});
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
    };

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
              disabled={true}
              onClick={this.handleClose}
            />,
          ];
      
          return (
            <div>
              <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
              <Dialog
                title="You must login to interact with this page."
                actions={actions}
                modal={true}
                open={this.state.open}
                autoScrollBodyContent={true}
              >

                {this.state.signup ? <Signup onLoginClick={this.onLoginClick} /> : <Login onRegisterClick={this.onRegisterClick}/> }

              </Dialog>
            </div>
          );
    }

}