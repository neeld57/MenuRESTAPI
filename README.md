# MenuRESTAPI
A REST API designed around functionality for a online menu

## Getting Started
To use this repository, clone, and then within the directory where the project is, type in 

`npm install --save` 

To run the API, then type

`node server.js` 


This will allow us to access our server at localhost:4000

## Using the REST API
To test this RESTful API, use a client such as [Postman](https://www.getpostman.com/) and then you can perform GET, POST, PUT, and DELETE requests. 

GET requests can be tested outright using the browser at localhost:4000/menusection or localhost:4000/menusection/:productid where ":productid" will be replaced by a number. Otherwise, it can be accessed on Postman as such:
![screenshot](https://user-images.githubusercontent.com/43457089/55689345-51bbdc80-5951-11e9-9de1-0ba34480061c.PNG)
![screenshot](https://user-images.githubusercontent.com/43457089/55689313-f2f66300-5950-11e9-82f8-a94a6ae762a1.PNG)
For POST and PUT requests, you will need to include a raw JSON body formatted as such:


`{
	“name” :  “Name of Food”
}`


![screenshot](https://user-images.githubusercontent.com/43457089/55689363-80d24e00-5951-11e9-8296-95d04cee46e6.PNG)
For DELETE requests, use localhost:4000/menusection/:productid where ":productid" will be replaced by a number. 
![screenshot](https://user-images.githubusercontent.com/43457089/55689381-aa8b7500-5951-11e9-8c8a-ee59c8ac1a7f.PNG)
