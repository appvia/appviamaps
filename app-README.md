# Deploying the AppviaMaps application

If you have not set up your Appvia Wayfnder instance then head on over to the [Setting up Appvia Wayfinder](admin-README.md) page, which will walk you though installing Wayfinder on teh Azure Marketplace.

If you have completed part one then you should have everything now set up ready to create Kubernetes clusters ready to build and deploy our application. 

Here's a reminder of or application architecture (please note that this tutorial is a BETA version which has the frontend and backend in **ONE** single deployment))
![App architecture](/img/img13.jpeg )

(please note that this tutorial is a BETA version which deploys an EJS frontend rather than react.js))
The frontend is a React.js application which simply delivers a google map application. The user is able to select a number of different data sets to dipsplay on the map from the dropdown proided. 

The frontend application can be found at: 
