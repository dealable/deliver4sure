
import locationDict from './lib/locationDict';

export function updateMap({ destination, origin, travelMode }) {
  console.log('typeof google', typeof google);
  if(typeof google !== 'undefined') {
    var map = new google.maps.Map(document.getElementById('routeMap'), {
      center: locationDict.block71sf,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = { destination , origin, travelMode };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }; 
}
const initMap = updateMap;

function startRouteMap0() {
  const destination = locationDict.block71sf;
  const origin = locationDict.indianapolis;
  const travelMode = 'DRIVING';
  initMap({ destination, origin, travelMode });
};

function startRouteMap1() {
  const destination = locationDict.chicago;
  const origin = locationDict.block71sf;
  const travelMode = 'DRIVING';
  initMap({ destination, origin, travelMode });
};

function startRouteMap2() {
  const destination = locationDict.chicago;
  const origin = locationDict.indianapolis;
  const travelMode = 'DRIVING';
  initMap({ destination, origin, travelMode });
};

export default { startRouteMap0, startRouteMap1, startRouteMap2 };