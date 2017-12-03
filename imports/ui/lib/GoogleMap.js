import React from 'react';
import PropTypes from 'prop-types';
import { Random } from 'meteor/random';
import { createContainer } from 'meteor/react-meteor-data';
import { withTracker } from 'meteor/react-meteor-data';

class GoogleMap extends React.Component {
  componentDidMount() {
    // GoogleMaps.load(this.props.options || {});
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      this.name = Random.id();

      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: this.props.mapOptions(),
      });

      this.props.onReady(this.name);
    }
  }

  componentWillUnmount() {
    if (GoogleMaps.maps[this.name]) {
      google.maps.event.clearInstanceListeners(
        GoogleMaps.maps[this.name].instance,
      );
      delete GoogleMaps.maps[this.name];
    }
  }

  render() {
    return (
      <div className="map-container" ref={c => this.container = c}>
        {this.props.children}
      </div>
    );
  }
}

GoogleMap.propTypes = {
  loaded: PropTypes.bool.isRequired,
  onReady: PropTypes.func.isRequired,
  options: PropTypes.object,
  mapOptions: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default withTracker(() => {
  return {
    loaded: GoogleMaps.loaded()
  }
})(GoogleMap);
