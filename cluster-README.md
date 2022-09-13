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
