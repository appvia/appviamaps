# Deploying the AppviaMaps application
If you have not set up your Appvia Wayfnder instance then head on over to the [Setting up Appvia Wayfinder](admin-README.md) page, which will walk you though installing Wayfinder on teh Azure Marketplace.

If you have completed part one then you should have everything now set up ready to create Kubernetes clusters ready to build and deploy our application. 

Here's the set of actions that we will go thorough in this tutorial

1. Application Architecture
2. Team workspace setup
3. Creating a Workspace
4. Creating a cluster plan
5. Create a Kuernetes cluster
6. Deploy your application
7. Build the frontend container
8. Build the backend services container
9. Create the Kubernetes configuration files
10. deployment.yaml
11. service.yaml
12. ingress.yaml
13. Running your application


## Application Architecture
Here's a reminder of or application architecture (please note that this tutorial is a BETA version which has the frontend and backend in **ONE** single deployment))
![App architecture](/img/img13.jpeg )

### Frontend
*(please note that this tutorial is a BETA version which deploys an EJS frontend rather than react.js))*
The frontend is a React.js application which simply delivers a google map application. The user is able to select a number of different data sets to dipsplay on the map from the dropdown proided. 

The frontend application can be found at [appviamaps/views](/views)

### Backend
The "backend" consists of a set of RESTful services exposed through Node.js HTTPS express services. 

#### server.js
The server.js file is a Node.js application that uses the express webserver to expose a set of services on port 80

#### dataServices.js
The dataServices.js connects directly to the database to present a set of map fata to the frontend.

#### postgress (mapdata)
The mapdata database holds map data sets fopr the front end to display

## Setting up your team workspaces

The last part of wortk we need to do in setting up ready to start coding is to create a team workspace. The workspace is where we add team users, create clusters and apply policy.

Creating a workspace is very simple. Switch to the user view of Wayfinder by clicking on the Wayfinder logo on the top left hand side of the UI.

![Switch to the Wayfinder user page](/img/img6.jpeg )

This page show the the workspaces that you are a member of. There should be no workspaces in a new cluster so **click on the "Add Workspace" button** at the top right of the page.

![Create Workspace modal](/img/img7.jpeg )

**Create the workspace with the name 'Appvia Maps Workspace' and the three letter code 'mdw' and click next.**

At this point you are given the choice to add workspace mambers, we'll skip this and create the workspace by clicking **"go to workspace"**

We'll be presented with the workspace landing page with similar quickstart tiles that you saw in the Admin page.

![Workspace main page](/img/img8.jpeg )

## Creating your Kubernetes cluster
Let's create the Kubernetes cluster we are going to use to deploy our application.

From the 'mdw' Workspace click on the 'Create Cluster' tile

![Create Cluster tile](/img/img9.jpeg )

From here. we will create am AKS cluster within the subscription that we set up earlier. Select the default AKS cluster plan, accepting all of the defaults and then click on the **"Create"** button.


![Create Cluster details](/img/img11.jpeg )

On the next modal create a "demo" namespace and continue.

This will take between 7-20 mins to create an AKS cluster and be ready to go.





