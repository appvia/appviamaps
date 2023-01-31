# Deploying the AWS S3 version of the AppviaMaps application
If you have not set up your Appvia Wayfnder instance then head on over to the [Setting up Appvia Wayfinder](admin-README.md) page, which will walk you though installing Wayfinder on teh Azure Marketplace.

If you have completed part one then you should have everything now set up ready to create Kubernetes clusters ready to build and deploy our application. 

Here's the set of actions that we will go thorough in this tutorial

1. Deploy your application
2. Build the frontend container
3. Build the backend services container
4. Create the Kubernetes configuration files
5. deployment.yaml
6. service.yaml
7. ingress.yaml
8. Running your application


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

#### AWS s3 
The .Env file setting has an S3 parameter. If this is set to 'true' then the app will look for specific S3 configurartions in the container environment variables. The only thing we need to do to use S3 is set this variable to true.

# Building and deploying the Appvia.io MyMap application
- Configure Google Maps API Access
- Build the Application Containers
- Deploy the application to Kubernetes 

**NB: If you have not alreasy set up a workspace and created a Kubernetes cluster then head on over to [Part Two - Creating your workspace and cluster](cluster-README.md)**

## Create & Configure Database
The application retrieves map data from a postgres database. We must first configure the database for the application. Version 1 of this tutorial uses a pre-configured DB and does not walk thrugh the creation of the database. We are assuming that a PostgreSQL varient of database has been provisioned and the database URL made available externally to the application. 

For this tutorial I am using an Amazon RDS database, mainly because I can ustilse the free tier of database service. Once you have the database available you must configure the DB with the following scripts. The datbase connection string must be saved as DATABASE_URL and copied into the .Env file that you will creat later in this section.

## Configure Google Maps API Key (Optional)
The Appvia.io MyMap application makes use of google maps and the google maps API. Without an API Key, the map that is displayed will be watermarked with "development only" and appear dark. This is fine for testing, but if you would like oto get a fully functional map then you must create an API key to access th javascript map API from google. The map API is free for up to 2000 requests a day so is fine for our purposes.  

Head over to the google documentation to find out how to greate your API Key. This will require a billing account, but you can set the linit to zero to ensure you do not get charged!

https://developers.google.com/maps/documentation/javascript/get-api-key

Once you have your API Key, then the key will be copied over into a configmap that the application will pick up at runtime. **Do not check your keys into github or any other public repository**

It's a good idea to move the key into an encrypted secret, but for now we will use a configmap.

## Building the application
This section runs through building and deploying the application. We would usually use a packaging framework like Helm to help us, but we will go through manual configuration to better our understaning og the components and configuration.

**Prerequisite - You need to have a container builder susch as [Docker Engine (Linux)](https://docs.docker.com/desktop/install/linux-install/), [Docker desktop (Mac/Windows)](https://www.docker.com/products/docker-desktop/) or [Podman (Mac/linux)](https://podman.io/)** 

### Build the frontend container

Firstly we will buld the frontend container image: 
The [Dockerfile](/Dockerfile) in this project contains the frontend containerisation instructions. Take a look at the Dockerfile to understand. 

```
docker build . -t [YOUR_REPO/IMAGENAME:IMAGETAG]

e.g.
docker build . -t bobsmith/appviamaps:v1
```

```
docker push  [YOUR_REPO/IMAGENAME:IMAGETAG]

e.g.
docker push  bobsmith/appviamaps:v1
```

### Build the backend services container
The services is currently deployed in a single container (frontend) the next version will split the frontend and backend containers. 




## Create the Kubernetes configuration
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
Firstly let's create a deployment object that configures our pod and container, amongst other things. The deployment yaml file will create a deployment resource along with pods(with running container) and replicationcontroller resources within the cluster.

**Go ahead and create the deployment by applying the deploment.yaml file as below
```
kubectl apply -f scripts/kubernetes/deployment.yaml
```

You can check that the deployment has succeeded by running the following checkes. 

```
1 - Does the deplolyment exist
kubectl get deployments -n frontend

2 - Has the pod been created
kubectl get pods -n frontend
```

If there are any errors that appear in the deployment or pods then investigate further by describing the resource or checking the pod logs or events. 

```
1 - Check for Kubernetes events
kubectl get events

2 - Describe a resource for more information
kubectl describe deployment [DEPLOYMENT_NAME] -n frontend

3 - Get pod logs
kubectl logs [POD_NAME] -n frontend 
```

### service.yaml
The serevice description is included in and deployed with the the deployment.yaml file, go and take a look at this. The service, which is essentially an internal load balancer which takes a request from a stable well defined service endpoint and load balances requests to pods which can be deployed anywhere in the cluster and have internal ip addresses defined at runtime and configured as they are deployed and re-sheduled across nodes in your cluster.

The service links a service endpoint to a pod through labels. Simply addding the pod selector label, which matches the label defined in the deployment pod spec is enough to configure thei internal network routing,


```
**the pod's label within the deployment.yaml
metadata:
  name: amd 
  labels:
    app: amd
    app.kubernetes.io/name: amd

**the selector within the service.yaml 
spec:
  selector:
    app.kubernetes.io/name: amd
```

**Check the service by applying the service.yaml as below**

check that the service is deployed
```
kubectl get services -n frontend 
kubectl describe service [SERVICE_NAME] -n frontend
```

**Check the app is running**
We can check that the app is running by forwading requests from the browser to your kubernetes pod
```
kubectl port-forward --namespace appviamaps service/amd-service 9000:9000
```

In your browser enter the following URL:
```
https://localhost:9000
```
You should see the application running!


### ingress.yaml
The final part of the deployment is to create a public URL by deploying an ingress resource for our application. 

When we created our cluster, we checked the box to include an "ingress controller". The default ingress controller is a NGINX load balancer that is configured to route incoming requests through fully qualified addresses to a service endpoint defined by the service resource that has just been created. 

When we deploy an ingress resource it dows a few things: 

1 - The ingress controller configures it's routing rules according to  ingress rules configuration. In our instance we configure the ingress controller to route external traffic from the hostname **host: mdw-ukdemo.demo-aws.wf.appvia.io*** to an internal service endpoint with a service name configures as **name: amd-service** on port 8080

```
spec:
  ingressClassName: external
  rules:
  - host: mdw-ukdemo.demo-aws.wf.appvia.io
    http:
      paths:
      - backend:
          service:
            name: amd-service
            port:
              number: 9000
        path: /
        pathType: Prefix
```
2. Wayfinder will create a certificate using the "Wayfinder certificate manager" (deployed into the cluster automatically) and generate a certificate request with LetsEncrypt which will issue the certificate. 

```
  annotations:
    cert-manager.io/cluster-issuer: "prod-le-dns01" 
```

3. Wayfinder will identify that there is a new public endpoint required, and if a DNS Zone has been created for the cluster Wayfinder will generate the DNS records required to route DNS to the externally facing ingress controller, and hance automatically create a DNS name for your ingress that is used to provide external access to the application.
 
 
 4. The ingress.yaml also contains a network policy which allows the ingress controller to connect to our "frontend" namespace on port 9000
 
 ```
 spec:
  ingress:
    - ports:
        - protocol: TCP
          port: 9000
      from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress
  podSelector: 
    matchLabels:
      app.kubernetes.io/name: "amd"
```
 
 **Go ahead and create the ingress by applying the ingress.yaml as below**
```
kubectl apply -f scripts/kubernetes/ingress.yaml
```

Your application should now be available on public DNS with at the address defined by the ingress. Describe the ingress resource to see the configures hostnam. The full URL mayhave been updated according to rules that have been set up by the DNZ Zone to give your application a unique DNS address. By default Wayfinder adds {workspace}, {clustername} and {stage} to the begining of the URL.

Check the hostname
```
kubectl get ingress -n frontend
```

Finally go to a browser and enter the URL and the application should be running:

![Application image](/img/app2.jpeg )

**Where's the data?**
Remember we switched the configuration to use AWS S3 storage for it's map data? Well, we now need to configure an S3 bucket and use it. This is where we can use the Wayfinder Terranetes ontroller to manage this for us.

**Export your AWS credentials to environment variables**
```
export AWS_ACCESS_KEY_ID=[put key here]
export AWS_SECRET_ACCESS_KEY=[put secret here]
export AWS_REGION=eu-west-1
```

**create a kubernetes secret with the AWS credentials**
```
kubectl -n terraform-system create secret generic aws --from-literal=AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --from-literal=AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --from-literal=AWS_REGION=$AWS_REGION
```

**Change the terranetes controller to use our secret and allow the modules**
```
kubectl delete provider aws
kubectl apply -f kubernetes/provider.yaml
kubectl apply -f ./kubernetes/modulepolicy.yaml
```

**Create the configmap that contains dat for the app to pick up**
```
kubectl create configmap env --from-file=./kubernetes/.Env
```

**Terranetes**
Download and install the latest terranetes CLI 
```
https://github.com/appvia/terranetes-controller/releases/download/v0.3.13/tnctl-darwin-amd64

sudo mv ~/Downloads/tnctl-darwin-amd64 /usr/local/bin/tnctl
chmod 775 /usr/local/bin/tnctl
```

Using the tnctl CLI we can now search for an S3 configuration in the allowed repositories
```
tnctl search s3

call the resource graemebucket [need to change this!]
```
This will generate a piece of YAML, ptut this into a file called bucket.yaml

Apply the yaml
```
kubectl apply -f ./bucket.yaml
```

Approve the terraform
```
tnctl describe graemebucket -n appviamaps
tnctl approve graemebucket -n appviamaps
```


Check which S3 Bucket we are using:
```
kc get secret graemebucket -n frontend -o yaml
echo [bucket id] | base64 --decode
```

Push the 
```
aws s3 ls s3:// [bucket id]

aws s3 ls  s3://terraform-20230120144454872800000001
aws s3 cp labels.json s3://terraform-20230120144454872800000001
aws s3 cp lloyds.json s3://terraform-20230120144454872800000001
```

The app should now have data
















