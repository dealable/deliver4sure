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

import AppBar from './AppBar';
import BottomNav from './BottomNav';
// import MyMap from './MyMap';
import routeFunctions, { startRouteMap0, startRouteMap1, startRouteMap2 } from './RouteMap';

import DeliveryList from './DeliveryList';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// console.log('routeFunctions', routeFunctions, { startRouteMap0, startRouteMap1, startRouteMap2 });
// setTimeout(()=>{routeFunctions.startRouteMap0()}, 500);
// setTimeout(()=>{routeFunctions.startRouteMap1()}, 3000);
// setTimeout(()=>{routeFunctions.startRouteMap2()}, 6000);

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

class SecretButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <div style={styles.container}>
        <Dialog
          open={this.state.open}
          title="Super Secret Password"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          1-2-3-4-5
        </Dialog>
        <h1>Material-UI</h1>
        <h2>example project</h2>
        <RaisedButton
          label="Super Secret Password"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    );
  }
}

const SimpleApp = () => (
  <div>
    <AppBar />
    <div className="map-container" id="routeMap" />
    <DeliveryList />
  </div>
);

// <BottomNav id="bottom-nav" />

// const MainComponent = MyMap;
const MainComponent = SimpleApp;

const wrappedComponent = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <MainComponent />
  </MuiThemeProvider>
)

// const App = MyMap;
const App = wrappedComponent;

export default App;