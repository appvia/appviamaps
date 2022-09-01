const dataServices = require("./dataServices.js");
const express = require('express');
const app = express();
const port = 9000;
app.set('view engine', 'ejs');
app.use(express.static('src/public'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


app.get('/', (req, res) => {
    dataServices.getLabels(function(labels){ 
        res.render('pages/index', {
        labels: labels
      });
    })
  });

app.get('/getMapData', (req, res) => {
    dataSet = req.query.dataSet;
    console.log("server:/getMapData("+dataSet+")");
    dataServices.getData(dataSet, function(data){
        JSON
        res.send(data);
    })
    
});

