 function initMap() {
    const myLatLng = { lat: 54.91422, lng: -1.38824 };
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "FTM",
    });
    
  // // Create the initial InfoWindow.
  // let infoWindow = new google.maps.InfoWindow({
  //   content: "Click the map to get Lat/Lng!",
  //   position: myLatLng,
  // });

  //infoWindow.open(map);

  // // Configure the click listener.
  // map.addListener("click", (mapsMouseEvent) => {
  //   // Close the current InfoWindow.
  //   infoWindow.close();

  //   // Create a new InfoWindow.
  //   infoWindow = new google.maps.InfoWindow({
  //     position: mapsMouseEvent.latLng,
  //   });
  //   infoWindow.setContent(
  //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
  //   );
  //   infoWindow.open(map);
  // });

  }
  



window.initMap = initMap;