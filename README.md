# Applicant Tracking System. 

## Quick Start.  

> Please follow below steps to install and run ATS on local system 

### Step 1 

```bash 

#Clone the repository code using bellow command 

git clone https://bitbucket.org/gspanntech/ats.git 

``` 

### Step 2 

```bash 

#Install all the dependencies for each of the folder (ats-microservice, ats-middleware, ats-ui ) 

#folder name - ats-ui 

cd ats-ui 

#command 

npm install 

  
#folder name - ats-middleware 

cd ats-middleware 

#command 

npm install 

  
#folder name - ats-microservices 

cd ats-microservices/position_micorservice 

#command 

npm install 

``` 

### Step 3 

```bash 

#Start the microservice, middleware, ats-ui using below commands 

 
#folder name - ats-microservices 

cd ats-microservices/position_micorservice 

##erve on localhost:3012 

npm start  


#folder name - ats-middleware 

cd ats-middleware 

#Serve on localhost:4000 

npm start 
 

#folder name - ats-ui 

cd ats-ui 

#Serve on localhost:3000 

npm install 

``` 

 