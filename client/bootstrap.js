import { demoFunctions }  from '../imports/api/demoInteractions';
import createFixtureData from '../imports/api/fixtureData';


if (Meteor.isClient) {
  Meteor.startup(function() {
    // createFixtureData()
    // demoFunctions();
    // load Goolge Maps

    const apiKeyGoogleMaps = 'AIzaSyDbC7YyTa2beNZbALqngl-3LUt0UqQc8nk';

    GoogleMaps.load({ v: '3', key: apiKeyGoogleMaps, libraries: 'geometry,places' });

    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });

  });
}