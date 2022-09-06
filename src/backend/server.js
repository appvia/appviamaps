const dataServices = require("./dataServices.js");
const express = require('express');
const app = express();
const port = 9000;
app.set('view engine', 'ejs');
app.use(express.static('src/public'));

const appviamp_api_key = process.env.APPVIAMAP_API_KEY;
const service_url = process.env.SERVICE_URL;


app.listen(port, () => {
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

