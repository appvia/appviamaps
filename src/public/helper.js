function hi() { 
    alert("hi");
}

/**
 * The main update function called directly from one of the UI components. 
 * This kick off a call to the backend services which will return a set of data to display on the map. 
 * The serviice requires a dataSet label to determine what data to rteturn.
 */
function requestUpdate(){
    //Get the dataset that has been requested, from the data dropdown.
    var e = document.getElementById("dataSet");
    var dataSet = e.options[e.selectedIndex].id;
    console.log("dataset="+dataSet);
    
    //Fetch the data then update the map
    fetchData("dataSet="+dataSet).then(data => {
        console.log(data); 
        updateMap(data);
      });
}

/**
 * Calls the server side data service getMapData, which returns an array of co-ordinate objects to display on the map.
 * @param {String} queryParams 
 * @returns 
 */
async function fetchData(queryParams) {
  const response = await fetch('http://localhost:9000/getMapData?'+queryParams);
  const data = await response.json();
  return data;
}


/**
 * Update the map with the data being returned from the backend service. 
 * @param {String} data 
 */
function updateMap(data){
  //grab the first marker and center on that one.
  //var newcenter = { lat: data.coords[0].lat, lng: data.coords[0].long };
  var newcenter = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].long) };


  //Update the map location and center
  const map = new google.maps.Map(document.getElementById("map"), {
     zoom: data[0].zoom,
     center: newcenter,
   });

   //Iterate through the co-ordinates and create a marker for each
   data.forEach(marker => {
     var cord = { lat: parseFloat(marker.lat), lng: parseFloat(marker.long) };
     new google.maps.Marker({
       position: cord,
       map,
       title: marker.label,
     });
   });
}
