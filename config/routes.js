// This file contains api routes
// Each object properties defines a single route  
// an object that represents Method, Controller, Model (optional) and Middleware (optional)

// Initial routes
var routes = {};
	
// a Route, represents a single endpoint
// Contains "/test" as the api path with method, controller and other parameters


// Test Route
Object.assign(routes, {
	"/test" : {
		// Request method
		method : 'GET', 
		// Name of the controller file in ./app/controllers/
	    controller : 'test',
	    // Includes middleware in the request, you can have multiple middlewares and note that
	    // System will execute the middleware in sequence based on the array index below
	    middleware : ["check_auth"]
	}
});


// Export all of defined routes
module.exports = routes;