import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import colors, {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,

  brown700,
  brown800,
  brown900,

} from 'material-ui/styles/colors';
import Mui from 'material-ui';
import {fade} from 'material-ui/utils/colorManipulator';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import {deepOrange500} from 'material-ui/styles/colors';

import AppBar from './chat/AppBar';
import BottomNav from './BottomNav';
// import MyMap from './MyMap';

import DeliveryList from './DeliveryList';


import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';



const muiTheme = getMuiTheme({
  palette: {
    primary1Color: brown800,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};
const standardActions = (
  <FlatButton
    label="Ok"
    primary={true}
    onTouchTap={this.handleRequestClose}
  />
);

const TextField = Mui.TextField;

const ListExampleChat = () => (
  <div>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Hey your parcel will arrive 20 minutes early at 2:20pm."
        leftAvatar={<Avatar src="images/kolage-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        leftAvatar={<Avatar src="images/kerem-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    <TextField
      hintText="Inform the customer"
      floatingLabelText="Chatting with customer"
    />
  </div>
);

const wrappedComponent = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar />
      <ListExampleChat />
    </div>
  </MuiThemeProvider>
)

export default wrappedComponent;