import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/markers.js';
import Deliveries from '../imports/api/deliveries.js';
import '../imports/api/chats.js';

Meteor.startup(() => {
  // code to run on server at startup

  // const checkD = Deliveries.find({deliveryStatus: 'declinedArchived'}).fetch();
  // console.log('checkD', checkD);

  // Deliveries.update({deliveryStatus: 'declinedArchived'}, {$set: {deliveryStatus: null}}, { multi: true })
});
