# AppviaMaps - Appvia Wayfinder Basic Tutorial


This is a tutorial that show how to deploy a containerised application into Appvia Wayfinder, making public cloud services easily consumable, securely and at scale.

![Application image](/img/app2.jpeg )

## Application Architecture

The application architecture we shall be deploying includes a browser based app which communicates to a frontend UI service. The seperately deployed services on the back end are responsible for communicatng with the map data and sending to the frntend. 

![App architecture](/img/img13.jpeg )

The tutorial is split into two sections. 

[**Part One - Setting up Appvia Wayfinder**](admin-README.md)
The first part of the tutorial walks through setting up Appvia Wayfinder with the basic defaults from Microsoft Azure Marketplace ready to use to deploy the demo app with a public endpoint.

[**Part Two - Deploying Appvia Maps Application**](app-README.md)
The following instructions will walk  through getting going from scratch with Appvia Wayfinder. 

The table of contents below shows the steps outlined in both of the sections. 

### Table of Contents

 1. Getting an Appvia Wayfinder instance through cloud marketplace
 2. Download the Wayfinder CLI
 2. Configuring your Wayfinder instance ready for teams to start coding
 3. Configure your cloud account
 4. Configuring users
 5. Configuring your external DNS
 3. Team workspace setup
 6. Creating a Workspace
 7. Creating a cluster plan
 8. Create a Kuernetes cluster
 9. Deploy your application
 10. Build the frontend container
 11. Build the backend services container
 12. Create the Kubernetes configuration files
 13. deployment.yaml
 14. service.yaml
 15. ingress.yaml
 16. Running your application

