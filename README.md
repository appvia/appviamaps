# Appvia.io MyMap - Appvia Wayfinder Basic Tutorial


This is a tutorial that show how to deploy a containerised application into Appvia Wayfinder, making public cloud services easily consumable, securely and at scale.

![Application image](/img/app2.jpeg )

## Application Architecture

The application architecture we shall be deploying includes a browser based app which communicates to a frontend UI service. The seperately deployed services on the back end are responsible for communicatng with the map data and sending to the frontend. 

![App architecture](/img/img13.jpeg )

The tutorial is split into two sections. 

[**Part One - Setting up Appvia Wayfinder**](admin-README.md)
The first part of the tutorial walks through setting up Appvia Wayfinder with the basic defaults from Microsoft Azure Marketplace ready to use to deploy the demo app with a public endpoint.

[**Part Two - Creating your workspace and cluster**](cluster-README.md)
The second part will alk through setting up a team workspace and then creating and accessing clusters.

[**Part Three - Creating clusters and Deploying the Appvia Maps Application**](app-README.md)
The final section will walk you through deploying creating the database dependencies, kubernetes configuration and application deployment. 

The table of contents below shows the steps outlined in each of the sections. 

### Table of Contents

[**Part One - Setting up Appvia Wayfinder**](app-README.md)
 1. Getting an Appvia Wayfinder instance through cloud marketplace
 2. Download the Wayfinder CLI
 3. Configuring your Wayfinder instance ready for teams to start coding
 4. Configure your cloud account
 5. Configuring users
 6. Configuring your external DNS
 7. Creating a cluster plan
 
 [**Part Two - Creating clusters and Deploying the Appvia Maps Application**](cluster-README.md)
 1. Team workspace setup
 2. Creating a Workspace
 3. Creating a cluster plan
 4. Create a Kubernetes cluster
 
 [**Part Three - Creating clusters and Deploying the Appvia Maps Application**](app-README.md)
 1. Deploy your application
 2. Build the frontend container
 3. Build the backend services container
 4. Create the Kubernetes configuration files
 5. deployment.yaml
 6. service.yaml
 7. ingress.yaml
 8. Running your application

