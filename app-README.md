# Deploying the AppviaMaps application
If you have not set up your Appvia Wayfnder instance then head on over to the [Setting up Appvia Wayfinder](admin-README.md) page, which will walk you though installing Wayfinder on teh Azure Marketplace.

If you have completed part one then you should have everything now set up ready to create Kubernetes clusters ready to build and deploy our application. 

Here's the set of actions that we will go thorough in this tutorial

1. Application Architecture
2. Team workspace setup
3. Creating a Workspace
4. Create a Kubernetes Cluster
5. Access your cluster
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

From here. we will create am AKS cluster within the subscription that we set up earlier. Select the default AKS cluster plan, accepting all of the defaults. Change the name of the cluster to "ukdemo" and then click on the **"Create"** button.

![Create Cluster details](/img/img11.jpeg )

On the next modal create a namespace called "frontend" and continue.

This will take between 7-20 mins to create an AKS cluster and be ready to go.

## Access your cluster
Once you cluster has been created we can test our cluster access. 

**Prerequisite 1: that you have downloaded WF, the wayfinder command line interface** 
- Download and install **wf** if you haven't already: https://docs.appvia.io/wayfinder/cli

**Prerequisite 2: that you have downloaded Kubectl, the kubernetes command line interface** 
- Download and install **kubectl** if you haven't already: https://kubernetes.io/docs/tasks/tools/

The steps to access the cluster are:

### 1 - Setup access to your wayfinder instance 
To access your Wayfinder instance through the CLI you must first connec to your Wayfinder. Click on your user icon on the top right of the UI and then click on the **"Setup Wayfinder CLI"** option

![Access Wayfinder CLI](/img/img14.jpeg )

This will bring up a modal with a command to execute in your CLI. Copy the command tyo your clipboard and run in your CLI terminal, this will connect your CLI to the running Wayfinder instance. 

![Access Wayfinder CLI](/img/img15.jpeg )

### 2 - Set up your AKS cluster access
Your cluster is accessed via normal **kubectl** commands, but protected by Wayfinder policies. Before you can access the cluster through kubectl you must request access by elevating your priviledges through an access policy. We will use the "out of the box" policies for now but if you want to read more then take a look here: https://docs.appvia.io/wayfinder/using/clusters

**Click on the Wayfinder image** on the top left hand of your UI to take you through to your Workspaces view. 

**Click on the your workspace "mdw"** to go through to your workspace view

**Click on the Resources->Clusters menu item** on the left hand menu bar to show the clusters in your workspace. 

**Click on the "Access Cluster" button** alighed to your cluster. This will give you the instructions to setup access your cluster. 

![Access Cluster](/img/img16.jpeg )

The first command changes the context of the **workspace** in this case to use the "mdw" workspace.
```
wf use workspace mdw
```

The second command sets up your kube context to point to the cluster's kubernetes API server
```
wf access cluster 
```

Select the role **"namespace.admin"** : this will evelvate your users priviledge to be the administrator of a namespace 
![Access Cluster](/img/img18.jpeg )

Select the **"frontend"** namespace  
![Access Cluster](/img/img19.jpeg )

Your Kubectl has now been configured to point at the **"ukdemo"** cluster with admin proviledges for the **"frontend"** namespace.

## Building and Deploying the application
This section runs through building and deploying the application. We would usually use a packaging framework like Helm to help us, but we will go through manual configuration to better our understaning og the components and configuration.

**Prerequisite - You need to have a container builder susch as [Docker Engine (Linux)](https://docs.docker.com/desktop/install/linux-install/), [Docker desktop (Mac/Windows)](https://www.docker.com/products/docker-desktop/) or [Podman (Mac/linux)](https://podman.io/)** 

### Build the frontend container

Firstly we will buld the frontend container image: 
The [Dockerfile](/Dockerfile) in this project contains the frontend containerisation instructions. Take a look at the Dockerfile to understand. 

```
docker build . -t [YOUR_REPO/IMAGENAME:IMAGETAG]
```

```
docker push  [YOUR_REPO/IMAGENAME:IMAGETAG]
```

### Build the backend services container
The services is currently deployed in a single container (frontend) the next version will split the frontend and backend containers. 

### Create the Kubernetes configuration
Our Kubernetes configuration is fairly simple, consiting of:

- **Configmap** Describs the external configuration needed for the application to run 
- **Deployment** Describing our Kubernetes pod, which points to our container image, and configures thingss likle replica sets etc.
- **Service** Describes the **internall** service endpoint that load balances access from a singel service endpoint into our running container(s)
- **Ingress** Describes the ingress route that directs the ingress controller's **external** endpoint to our internal service endpoint

### Congifigmap
We will create a Kubernetes to externalise some of our keys and access URLS. 
1 - Create a file called .Env with the following configuration parameters: 

```
APPVIAMAP_API_KEY=[an API KEY for google maps (leave blank for dev)] 
SERVICE_URL=http://localhost:9000/getMapData? 
DATABASE_URL=[postgres connection URL]
```

2 - Create a configmap from this file

```
kubectl create configmap env --from-file=./.Env
```

### deployment.yaml
Firstly let's create a deployment object that configures our pod and container, amongst other things. 

```
kubectl apply -f scripts/kubernetes/deployment.yaml
```

### service.yaml

```
kubectl apply -f scripts/kubernetes/service.yaml
```


### ingress.yaml

```
kubectl apply -f scripts/kubernetes/ingress.yaml
```

### Running your application


