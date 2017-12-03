
import React, {Component} from 'react';

// mui elements
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

// icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

// components
class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <IconButton
          onClick={this.handleToggle}
        >
          <NavigationMenu color='white' />
        </IconButton>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >

          <List>
            <ListItem
              primaryText="Brendan Lim"
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <Divider />

            <MenuItem onClick={this.handleClose}>Today</MenuItem>
            <MenuItem onClick={this.handleClose}>Tomorrow</MenuItem>
            <MenuItem onClick={this.handleClose}>Yesterday</MenuItem>
            <Divider />

            <Subheader>Recent chats</Subheader>
            <ListItem
              primaryText="Eric Hoffman"
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
          <Divider />
          <List>
            <Subheader>Previous chats</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="images/chexee-128.jpg" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="images/jsa-128.jpg" />}
            />
          </List>

        </Drawer>
      </div>
    );
  }
}

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppBarExampleComposition extends Component {
  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    const iconElementLeft = <DrawerUndockedExample />;

    const iconElementRight = (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Update route" leftIcon={<RemoveRedEye />} />
        <MenuItem primaryText="Sign out" leftIcon={<ContentLink />} />
        <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
        <Toggle
          label="Show failed"
          defaultToggled={false}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />

      </IconMenu>
    );

    return (
      <div>
        <AppBar
          title="Delivery"
          iconElementLeft={iconElementLeft}
          iconElementRight={iconElementRight}
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;