import Deliveries from './deliveries';
import Chats from './chats';
import moment from 'moment';
import { Random } from 'meteor/random';

const deliveryDays = [
  // moment().subtract(1, 'days').toDate(),
  // new Date(),
  moment().add(1, 'days').toDate(),
];
console.log('deliveryDays', deliveryDays, );

let chatHistory = [
  {
    sender: "customer",
    message: "Ok great, I am here now.",
    image: "images/ok-128.jpg",
  },
  {
    sender: "customer",
    message: "See you soon.",
    image: "images/ok-128.jpg",
  },
];

const small = () => ({
    active: true,
    participants: [],
    deliveryId: 'delivery1',
    chatHistory: [
      {
        sender: "driver",
        message: "Hey your parcel will arrive 20 minutes early at 2:20pm.",
        image: "images/kolage-128.jpg",
        read: false,
        createdAt: new Date('2017-12-02'),
      }
    ],
  });
const chatList = [
  small(),
  {
    active: true,
    participants: [],
    deliveryId: 'delivery2',
    chatHistory: [
      {
        read: false,
        message: 'Hi, when will my package arrive?',
        createdAt: new Date('2017-12-02'),
        sender: '',
      }
    ],
  },
];











const deliveries = [
  {
    deliveryId: 'delivery1',
    address: '123 Morris Street, San Francisco, CA',
    description: '2 medium, high-value',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'pending',
        expectedTime: '2:22pm',
      }
    ],
  },
  {
    deliveryId: 'delivery2',
    address: '200 Mission Street, San Francisco, CA',
    description: '2 small, high-value',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '2:31pm',
      }
    ],
  },
  {
    deliveryId: 'delivery3',
    address: '322 Elmira Street, San Francisco, CA',
    description: '1 small, fragile',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '3:02pm',
      }
    ],
  },
  {
    deliveryId: 'delivery4',
    address: '96 Market Street, San Francisco, CA',
    description: '1 small, fragile',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '3:02pm',
      }
    ],
  },
  {
    deliveryId: 'delivery5',
    address: '322 Elmira Street, San Francisco, CA',
    description: '1 small, fragile',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '3:02pm',
      }
    ],
  },
  {
    deliveryId: 'delivery6',
    address: '450 Jackson Street, San Francisco, CA',
    description: '1 small, fragile',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '3:02pm',
      }
    ],
  },
  {
    deliveryId: 'delivery7',
    address: '85 Galvez Avenue, San Francisco, CA',
    description: '1 small, fragile',
    deliveryAttempts: [
      {
        confirmationRequestStatus: 'none',
        expectedTime: '3:02pm',
      }
    ],
  },
];

export default function createFixtureData() {
  deliveryDays.map((deliveryDay)=>{
    const deliveryDayId = "g8nrTvmpDsxS2GWmp";
      // Random.id();
    const createdAt = new Date();
    console.log('creating fixture data for ', deliveryDayId, createdAt);
    const chatData = _.map(chatList, (chatObj)=>{
      const chatObj2 = _.extend(chatObj, { deliveryDayId, createdAt });
      Chats.insert(chatObj2);
    })
    // const deliveryData = _.map(deliveries, (deliveryObj)=>{
    //   const deliveryObj2 = _.extend(deliveryObj, { deliveryDayId, createdAt });
    //   Deliveries.insert(deliveryObj2);
    // })
  });
};