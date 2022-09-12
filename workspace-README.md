# Setting up your team workspaces

The last part of wortk we need to do in setting up ready to start coding is to create a team workspace. The workspace is where we add team users, create clusters and apply policy.

Creating a workspace is very simple. Switch to the user view of Wayfinder by clicking on the Wayfinder logo on the top left hand side of the UI.

![Switch to the Wayfinder user page](/img/img6.jpeg )

This page show the the workspaces that you are a member of. There should be no workspaces in a new cluster so **click on the "Add Workspace" button** at the top right of the page. 

![Create Workspace modal](/img/img7.jpeg )

**Create the workspace with the name 'Appvia Maps Workspace' and the three letter code 'mdw' and click next.**

At this point you are given the choice to add workspace mambers, we'll skip this and create the workspace by clicking **"go to workspace"**

We'll be presented with the workspace landing page with similar quickstart tiles that you saw in the Admin page. 

![Workspace main page](/img/img8.jpeg )

# Creating your Kubernetes cluster 
Let's create the Kubernetes cluster we are going to use to deploy our application.

From the 'mdw' Workspace click on the 'Create Cluster' tile 

![Create Cluster tile](/img/img9.jpeg )

From here. we will create am AKS cluster within the subscription that we set up earlier. Select the default AKS cluster plan, accepting all of the defaults and then click on the **"Create"** button. 


![Create Cluster details](/img/img11.jpeg )

On the next modal create a "demo" namespace and continue.

This will take between 7-20 mins to create an AKS cluster and be ready to go. 
