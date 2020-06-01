Project Details

1. Introduction

This Project provides a web application with Angular supported frontend, REST supported backend developed with SpringBoot framework and MySQL database.

2. PreRequisites

JRE
Maven
npm
MySQL

3. Project Configuration

We will be running the application in 3 steps:

3.1 Setting up Mysql

Make sure that MySQL is installed and username and password is configured.

3.2 Setting up REST API

Run the following command to change the directory to resources:
             cd  /JWTAuthentication1/src/main/resources

Open application.properties file and change following properties:
spring.datasource.username=<mysql-username>
spring.datasource.password=<mysql-password>
	
Change the directory to /JWTAuthentication/
Run the following command to build the project:
mvn clean package
Above command will build the application and create a jar file in /JWTAuthentication1/target folder
To run the Spring boot project run the following command:
 java -jar target/JWTAuthentication-0.0.1-SNAPSHOT.jar
Now your Springboot application is up and running on http://localhost:8080 via embedded Tomcat server provided by Spring.
3.3 Setting up Angular
In /CovidProject/src/app/utility change the url field pointing to your backend application.By default,
it is set to http://localhost:8080 . 
Run the following command to change the directory:
cd  /Covid19Repository/CovidProject
Run:
sudo npm install
Run:
sudo ng serve
This will deploy the Angular application on localhost at port 4200.

YOUR PROJECT IS COMPLETELY SET NOW.
