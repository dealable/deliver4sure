import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';


import {List, ListItem} from 'material-ui/List';

// icons
import SvgIcons from 'material-ui/svg-icons';

import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import colors, {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

// collections
import Deliveries from '../api/deliveries';
import Chats from '../api/chats';
import { dataFilter } from '../api/demoFilters';


// Map

import { updateMap } from './RouteMap';
console.log('updateMap', updateMap);

let INIT = true;
let INIT2 = true;

const ListExampleFolder = (props) => {
  const DeliveryItem = ({address, description, deliveryAttempts, deliveryStatus }) => {
    const defaultAttemptObj = {
        confirmationRequestStatus: 'none',
        nextAction: '',
      };
    const latestAttempt = (deliveryAttempts && deliveryAttempts[0]) ? deliveryAttempts[0] : defaultAttemptObj;
    let leftIcon = <SvgIcons.AlertWarning />
    let rightIcon; // = <SvgIcons.ImagePanoramaFishEye />
    let backgroundColor = blue500;
    let leftBackground = blue500;
    let rightBackground = colors.green200;
    switch (latestAttempt.confirmationRequestStatus) {
      case 'confirmed':
        leftIcon = <SvgIcons.ActionCheckCircle />
        rightIcon = <SvgIcons.ActionCheckCircle />
        break;
      case 'declined':
        leftIcon = <SvgIcons.ContentClear />
        leftBackground = colors.red600;
        rightBackground = yellow600;
        break;
      case 'pending':
        leftIcon = <SvgIcons.ActionHourglassEmpty />
        leftBackground = colors.yellow800;
        rightBackground = colors.yellow600;
        break;
      case 'none':
        leftIcon = <SvgIcons.AvPlayCircleOutline />
        leftBackground = colors.grey700;
        break;
    };


    switch (deliveryStatus) {
      case 'declined':
        leftIcon = <SvgIcons.ContentClear />
        rightIcon = <SvgIcons.ContentClear />
        leftBackground = colors.red600;
        rightBackground = yellow600;
        break;
      case 'complete':
        leftIcon = <SvgIcons.ContentClear />
        rightIcon = <SvgIcons.ActionCheckCircle />
        leftBackground = colors.red600;
        rightBackground = yellow600;
        break;
    };

    return (
      <ListItem
        leftAvatar={<Avatar icon={leftIcon} backgroundColor={leftBackground} />}
        rightAvatar={<Avatar icon={rightIcon} backgroundColor={rightBackground} />}
        primaryText={address}
        secondaryText={description}
        style={ deliveryStatus === 'declined' ? {textDecoration: 'line-through'} : {} }
      />
    )
  };
  
  console.log('props.deliveries', props.deliveries);

  const origin = props.deliveries[0] && props.deliveries[0].address;
  const destination = props.deliveries[1] && props.deliveries[1].address;
  const travelMode = 'DRIVING';
  if(origin && destination) updateMap({ destination, origin, travelMode });

  const updateDelivery = (deliveryId)=>{
    console.log('hello', deliveryId, props.updateDelivery(deliveryId))
  };
  return (
    <div>
      <List>
        <Subheader> Confirmation Status </Subheader>
        {/* <Subheader > Delivery Status</Subheader> */}
        { props.deliveries.map((deliveryDetails, i)=><DeliveryItem key={i} {...deliveryDetails} />) }
      </List>
    </div>
)};


export default withTracker(() => {
  return {
    chatList: Chats.find(dataFilter, { sort: { createdAt: -1 }}).fetch(),
    deliveries: Deliveries.find(_.extend(dataFilter, {deliveryStatus: { $ne: 'declinedArchived' } }), { sort: { createdAt: -1 }}).fetch(),
    updateDelivery: ({_id, status}) => Deliveries.update(_id, { $set: { deliveryStatus: status }}),
  };
})(ListExampleFolder);