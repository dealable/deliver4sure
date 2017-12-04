import React from 'react';
import {mount} from 'react-mounter';

import App from '../ui/App2.js';
import ChatApp from '../ui/ChatApp.js';

// const MainLayout = ({content}) => (
//   <div>
//     <header>
//       This is our header
//     </header>
//     <main>
//       {content()}
//     </main>
//   </div>
// );

// if (false) {
//   mount(MainLayout, {
//     content: () => (<WelcomeComponent name="Arunoda" />)
//   });
// };


const WelcomeComponent = ({name}) => (<p>Hello, {name}</p>);

// mount(WelcomeComponent, {name: 'Arunoda'});
FlowRouter.route("/", {
  // subscriptions: function() {
  //   var selector = {category: {$ne: "private"}};
  //   this.register('posts', Meteor.subscribe('posts', selector));
  // },
  action: function() {
    mount(App);
  }
});

FlowRouter.route("/chat1", {
  // subscriptions: function() {
  //   var selector = {category: {$ne: "private"}};
  //   this.register('posts', Meteor.subscribe('posts', selector));
  // },
  action: function() {
    mount(ChatApp);
  }
});

FlowRouter.route("/chat3", {
  // subscriptions: function() {
  //   var selector = {category: {$ne: "private"}};
  //   this.register('posts', Meteor.subscribe('posts', selector));
  // },
  action: function() {
    mount(ChatApp);
  }
});



