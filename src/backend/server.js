const dataServices = require("./dataServices.js");
const fs = require('fs');
const express = require('express');
require('dotenv').config({ path: require('find-config')('.Env') })
const app = express();
const port = 9000;
app.set('view engine', 'ejs');
app.use(express.static('src/public'));


console.log(process.env);
const appviamp_api_key = process.env.APPVIAMAP_API_KEY;
const service_url = process.env.SERVICE_URL;
console.log("api=" +appviamp_api_key + " - svc=" +service_url);

/**
 * FIXME 
 * For some reason we need to read the .Env file before the process.env can read it. 
 * DOn't really know why but need to ffix.
 */
fs.readFile('./.Env', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});


app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});


/**
 * initial page request. Returns the list of data set labels to display 
 * in the header dropdown 
 */
app.get('/', (req, res) => {
    dataServices.getLabels(function(labels){ 
        res.render('pages/index', {
        labels: labels,
        apikey: appviamp_api_key,
        serviceUrl: service_url
      });
    })
  });


  /**
   * returns map co-ordinates for a given saved set, identified by 
   * the set label in the query parameter called dataSet
   */
app.get('/getMapData', (req, res) => {
    dataSet = req.query.dataSet;
    console.log("server:/getMapData("+dataSet+")");
    dataServices.getData(dataSet, function(data){
        JSON
        res.send(data);
    })

    
    
});

