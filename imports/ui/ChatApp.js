import moment from 'moment';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { withTracker } from 'meteor/react-meteor-data';

// collections
import Deliveries from '../api/deliveries';
import Chats from '../api/chats';
import { dataFilter } from '../api/demoFilters';



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

import SvgIcons from 'material-ui/svg-icons';


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

// let chatHistory = [
//   {
//     sender: "driver",
//     message: "Hey your parcel will arrive 20 minutes early at 2:20pm.",
//     image: "images/kolage-128.jpg",
//   },
//   {
//     sender: "customer",
//     message: "Ok great, I am here now.",
//     image: "images/ok-128.jpg",
//   },
//   {
//     sender: "customer",
//     message: "See you soon.",
//     image: "images/ok-128.jpg",
//   },
// ];

class ListExampleChat extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: '',
    };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  _onKeyPress(event) {
    if (event.charCode === 13) { // enter key pressed
      event.preventDefault();
      this.handleSubmit(event);
    } 
  }

  handleSubmit(event) {
    this.setState({value: ''});
    this.props.sendMessage({message: event.target.value})
  }

  render() {

    const self = this;
    const chatList = self.props.chatList;
    const chatHistory = (chatList) ? chatList.chatHistory : [];

  // console.log('chatHistory', chatList, chatHistory, chatHistory.map );
  return (
    <div>
      <List>
        <Subheader style={{textAlign: 'center'}} >{moment().format('MMMM Do YYYY')}</Subheader>
        { (typeof chatHistory === 'undefined') ? null : chatHistory.map(({sender, image, message}, i)=>{
            const styleProps = sender === "customer" ? {
              rightAvatar: ( <Avatar src={image} /> ),
              style: {marginLeft: '20%'}
            } : {
              leftAvatar: ( <Avatar src={image} /> ),
              style: {marginRight: '10%'}
            };

            return (
              <ListItem
                key={i}
                primaryText={message}
                { ... styleProps }
              />
          )})
        }
      <div style={{position: 'fixed', bottom: 0, marginLeft: 10}}>
        <TextField
          value={this.state.value}
          onChange={self.handleChange.bind(self)}
          hintText="Inform the customer"
          floatingLabelText="Chatting with delivery guy"
          onKeyPress={self._onKeyPress.bind(self)}
        />

        <SvgIcons.ContentSend 
          style={{ textAlign: 'right', color: 'lightblue'}}
          onClick={()=>{self.handleSubmit({target: {value: self.state.value }})}}
        />
      </div>
      </List>
    </div>
  )
}};

const ListExampleChatContainer = withTracker(() => {
  return {
    chatList: Chats.findOne({}),
    deliveries: Deliveries.find(_.extend(dataFilter, {deliveryStatus: { $ne: 'declinedArchived' } }), { sort: { createdAt: 1 }}).fetch(),
    updateDelivery: ({_id, status}) => Deliveries.update(_id, { $set: { deliveryStatus: status }}),
    sendMessage: ({message}) => Chats.update("yTtHCty3693Pz2mJ8", { 
      $push: {
        "chatHistory": {
        sender: "customer",
        message,
        image: "images/ok-128.jpg",
        read: false,
        createdAt: new Date(),
      }
    }}),
  };
})(ListExampleChat);

const wrappedComponent = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar />
      <ListExampleChatContainer />
    </div>
  </MuiThemeProvider>
)

export default wrappedComponent;