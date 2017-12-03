import React, { Component } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from './lib/GoogleMap';
import Markers from '../api/markers';
// import Geolocation from 'geolocation';

const showMyLocation = ({marker, MAP_ZOOM, map}) => {
  Tracker.autorun(c => {
    // update my location
    var latLng = Geolocation.latLng();
      console.log('geo', latLng, marker );
    if (! latLng)
      return;

    // If the marker doesn't yet exist, create it.
    if (! marker) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng.lat, latLng.lng),
        map: map.instance
      });
    }
    // The marker already exists, so we'll just change its position.
    else {
      marker.setPosition(latLng);
    }

    // Center and zoom the map view onto the current position.
    map.instance.setCenter(marker.getPosition());
    map.instance.setZoom(MAP_ZOOM);
  });
};

const addMarkersToMap = ({map}) => {
  Tracker.autorun(c => {
    // add marker on click
    google.maps.event.addListener(map.instance, 'click', function(event) {
      Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });

    const markers = {};

    Markers.find().observe({
      added: function(document) {
        const marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          id: document._id,
        });

        google.maps.event.addListener(marker, 'dragend', function(event) {
          Markers.update(marker.id, {
            $set: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          });
        });

        markers[document._id] = marker;
      },
      changed: function(newDocument, oldDocument) {
        markers[newDocument._id].setPosition({
          lat: newDocument.lat,
          lng: newDocument.lng,
        });
      },
      removed: function(oldDocument) {
        markers[oldDocument._id].setMap(null);
        google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
        delete markers[oldDocument._id];
      },
    });
    this.computation = c;
  });
};

const updateRoute = ({marker, MAP_ZOOM, map}) => {
  var chicago = {lat: 41.85, lng: -87.65};
  var indianapolis = {lat: 39.79, lng: -86.14};

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  console.log('directionsDisplay', directionsDisplay);

  // Set destination, origin and travel mode.
  var request = {
    origin: chicago,
    destination: indianapolis,
    travelMode: 'DRIVING'
  };

  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    console.log('directionsService', response, status);
    if (status == 'OK') {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });

  // Tracker.autorun(c => {
  //   // update my location
  //   var latLng = Geolocation.latLng();
  //     console.log('geo', latLng, marker );
  //   if (! latLng)
  //     return;

  //   // If the marker doesn't yet exist, create it.
  //   if (! marker) {
  //     marker = new google.maps.Marker({
  //       position: new google.maps.LatLng(latLng.lat, latLng.lng),
  //       map: map.instance
  //     });
  //   }
  //   // The marker already exists, so we'll just change its position.
  //   else {
  //     marker.setPosition(latLng);
  //   }

  //   // Center and zoom the map view onto the current position.
  //   map.instance.setCenter(marker.getPosition());
  //   map.instance.setZoom(MAP_ZOOM);
  // });
};



class MyMap extends Component {
  constructor() {
    super();
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {

    // var map = new google.maps.Map({
    //   center: chicago,
    //   zoom: 7
    // });
    // return map;

    console.log('google.maps', google.maps);
    const getGoogleLatLng = (locationInfo) => ({
      center: new google.maps.LatLng(locationInfo.lat, locationInfo.lng), zoom: locationInfo.zoom,
    });
    return getGoogleLatLng(gpsDict.indianapolis);
  }

  handleOnReady(name) {
    GoogleMaps.ready(name, map => {
      let marker;
      let MAP_ZOOM = 7;
      // showMyLocation({marker, MAP_ZOOM, map});
      updateRoute({marker, MAP_ZOOM, map});
      // addMarkersToMap({map});
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <div id='map-wrapper'>
        <GoogleMap
          onReady={this.handleOnReady}
          mapOptions={this.handleMapOptions}
        >
          Loading!
        </GoogleMap>
      </div>
    );
  }
}

export default MyMap;
