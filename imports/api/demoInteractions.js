import Deliveries from './deliveries';
import Chats from './chats';

import { dataFilter } from './demoFilters';
import createFixtureData from './fixtureData';

// add data
// const ADD_DATA = true;
// if(ADD_DATA) 
// createFixtureData()

// start interactions
const repeatCount = 3;
const waitTime1 = 2;
// const waitTime2 = 4;

const repeatCounter = 0;

export function demoFunctions() {
  if(repeatCounter < repeatCount) {
    repeatCounter = repeatCounter + 1;
    console.log(repeatCounter);
    Meteor.setTimeout(()=>{
      const firstDelivery = Deliveries.findOne(_.extend(dataFilter, {deliveryStatus: { $ne: 'declinedArchived' } }), { sort: { createdAt: -1 }});
      console.log('step1', firstDelivery);
      Deliveries.update(firstDelivery._id, { $set: { deliveryStatus: 'declined' }}, console.log)

      Meteor.setTimeout(()=>{
        const firstDelivery = Deliveries.findOne(_.extend(dataFilter, {deliveryStatus: { $ne: 'declinedArchived' } }), { sort: { createdAt: -1 }});
        console.log('step2', firstDelivery);
        Deliveries.update(firstDelivery._id, { $set: { deliveryStatus: 'declinedArchived' }}, console.log)
      }, waitTime1 * 1000);

    }, waitTime1 * 1000); 
  }; 

 
};
