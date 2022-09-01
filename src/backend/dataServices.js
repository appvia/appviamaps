const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://mapsdb:password@localhost:5432/mapsdb')

// const labels = [{id:"myhouse", displayName:"My FHouse"},{id:"pubsnearme", displayName:"Pubs Near Me"}];
// const myHouse='{"lat": 51.437603, "long": -2.072247}';
// const dataToReturn="";

/**
 * return a set of data points 
 */
  function getData(label, cb) {
    //Get the data tag to return from the URL
    const query="select * from coordinate c, markers m, area_of_interest a where c.coordinate_name=m.coordinate_name and a.aoi_name=m.aoi_name and a.aoi_name=$1"
    console.log(console.debug, "Fetching data with label:" +label);
    db.any(query, label).then((data) => {
        console.log('DATA:', data)
        cb(data);
    })
    .catch((error) => {
        console.log('ERROR:', error); 
        cb(data);
  })
};


/**
 * Returns a list of labels from the database
 */
function getLabels(cb){
    // Call the database to fetch a set of labels
    const query="SELECT distinct aoi_name, display from area_of_interest;";

    db.query(query).then((data) => {
        cb(data);
    })
    .catch((error) => {
        console.log('ERROR:', error)
        cb(data);
  })
}



/**
 * EXPORTED FUNCTIONS
 */
module.exports = {getData, getLabels};