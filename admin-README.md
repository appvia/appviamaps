# AppviaMaps Administrator - Appvia Wayfinder install and setup


1. Getting an Appvia Wayfinder instance through cloud marketplace
2. Download the Wayfinder CLI
3. Configuring your Wayfinder instance ready for teams to start coding
4. Configure your cloud account
5. Configuring users
6. Configuring your external DNS
7. Create a cluster plan

# Getting an Appvia Wayfinder instance through cloud marketplace

The easiest way to get hold of an Appvia Wayfinder is to create a managed Wayfinder service through either Microsoft Azure or Amazon AWS marketplace. 

## Microsoft Azure
Head over to the Azure marketplace to install a Wayfinder instance within your Azure account. You can use an existing account or sign up for some free compute services. Appvia provide a free tier of services that will enable you to run this demo without incurring charges.  
https://azuremarketplace.microsoft.com/en-us/marketplace/apps/appvialtd.wayfinder?tab=overview

Follow the instructions from the marketplace page to create a Wayfinder instance. There's a video on the main marketplace page that takes you through the steps to get up and running. 

![Microsoft Azure managed application page](/img/img1.jpeg)

## Amazon AWS
We'll come back to this service. 

# Configuring your Wayfinder instance

Once you have a basic Wayfinder instance up and running there are some important steps that a Wayfinder administrator must complete to make the platform vilable to end users to start creating resources. 

## Download the Wayfinder CLI

You will need the Wayfinder CLI downloaded and installed, follow the instructions provided here https://docs.appvia.io/wayfinder/cli

## Download and Log into your cloud CLI
Before setting up your Wayfinder instance you must have your cloud CLI installed and installed on your local machine. For Azure, please see the Microsoft documentation: https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli

```
az login 
# Set the subscription to the friendly name of the subscription 
# you wish Wayfinder to use:
az account set --subscription "SUBSCRIPTION_NAME"
```

##  Configure your cloud account
Wayfinder has been installed into your public cloud of choce either through a cloud marketplace or a manual install. Wayfinder is a control plane for creating anad managing resources on **any cloud**. For Wayfinder to create services in your public cloud, it **must** have access to that coud account with roles that enable Wayfinder to create and manage resoruces.    

The marketplace install will have installed a Wayfinder instance and exported the credentials used into the properties of the markeplace application intall. e.g. Azure marketplace will have created wayfinder as a "managed application", click into that managed application in the Azure portal and click on the "Parameters and Outputs" link on the left hand navigation pane to show the login url, localAdmin user details and temporary password. 

**Log into your Wayfinder instance using these credentials.** This will take us to the landing page as a Wayfinder 'localAdmin' administrator user. We will use this user to get up and running.

**Click on the quickstart page tile "Connect your cloud accounts"**

Here we can configure a cloud account onto one of the three clouds that you want to start creating clusters and resources. Clicking on the "Connect Account" button on the top right we are presented with a choice of two types of accounts that can be configured, the documentation can be found here:

- https://docs.appvia.io/wayfinder/admin/accounts/azure-org
- https://docs.appvia.io/wayfinder/admin/accounts/aws-org

![Wayfinder account creation](/img/img3.jpeg )

**Choose to create an exiting shared accout and fill out the the coud account details**
This tutorial assimes that you have installed Wayfinder from Azure Marketplace, and as such already has a cloud identity automatically created. If this is not the case then follow the instructions here: https://docs.appvia.io/wayfinder/admin/accounts/azure-cloud-identity

![Wayfinder account creation](/img/img4.jpeg )

Once this is run from the UI, you will nothice that there are items highlighted with **"Action Required"** which indicate that you must run some CLI commands. Execute the following commmands (You must log into your Azure CLI before executing thise commands):

Click onto the cloud account and select the features tab,, clicking on one of the features with a red warning triangle should give you the commands needed to execute from the wf cli. 

![Wayfinder account creation](/img/img10.jpeg )

```wf setup roles -w admin --cloud-account [your cloud account name]```
*nb: omit the individual role names to tell wf to set up all roles*

This command performs the linking of the Wayfinder components to the underlying cloud account to set up IAM and Could Roles. 

## Configuring users

For this tutorial we will not configure any new users.We'll use the localAdmin user that was asutomatically created during the install. 

## Configuring external DNS

Wayfinder makes it simple for your developers to create applications and expose them externally through managed DNS. We'll configure this instance to manage DNS for our develoeprs. 

We will configure a parent DNS zone that will be made available to any workspace. which will automatically provision child DNS zones whenever a cluster ingress is created. There are many options to configure but we'll adopt this simple use case.  

Select the **Manage self-service DNS zones** tile from the administator page. 

![set ip DNS](/img/img5.jpeg )

*(This tutorial assumes that you have access and ownership to a Domain and the ability to deligate DNS to the Wayfinder managed DNS zone)*
**Fill out the DNS form, following instructions here: https://docs.appvia.io/wayfinder/admin/networking/dns**

You will be presented with an **Action Required** with NS records that are required to deletgate your DNS to the Wayfinder managed DNS zone. Update your original DNS NS records to reflect the delegation to Wayfinder managed zones.

## Creating a cluster plan
At this point we could create a cluster plan to template and guardrail our users to help define or restrict the Kubernetes clusters that they will be able to create. We are going to stick to the out of the box pre-defined cluster plans for now which provide sensible defaults. 

