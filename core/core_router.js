// Get the available routes from ./config/route.js file
const routes = require('../config/routes'), env = require("../config/env"), helper = require("../libs/helper"), error_handler = require("./core_error_handler"), fs = require('fs');

Object.assign(routes, {
	'/' : {},
	'/storage/*' : {},
	'/file/upload' : { method : "POST"},
});

// Start the routing process
module.exports = async (router, global) => {
	// Logs the console that the routing is already started
	helper.print.log('Starting ' + 'rapid-node-js'.cyan + ' api server on port '.white + `${env.port}` .cyan)
	helper.print.log('Preparing ' + `${Object.keys(routes).length}`.cyan + ' API routes '.white);
	
	// Here's where the magic happens
	// First, we gonna loop through each endpoint in ./config/routes.js file
	Object.keys(routes).forEach(async $route => {
		// Get the route method
		let $route_method = routes[$route].method ? routes[$route].method : "GET", 
			// defines the route controller
			$route_controller = routes[$route].controller, 
			// Check if endpoint is using Database connection
			$route_is_use_database = routes[$route].database ? routes[$route].database : false, 
			// Predefined the route model and set to empty array if theres none
			$route_model = routes[$route].model ? routes[$route].model : [], 
			// Defines route's middlewares
			$route_middleware = routes[$route].middleware ? routes[$route].middleware : [];

		// run the controller based on request
		await router[$route_method.toLowerCase()]($route, async function(req, res, next) { 
			// Root directory
			if($route == "" || $route == "/"){ 
				// return the index.html file
				res.sendFile(global.base_dir + '/index.html');	
			}else if($route == "storage/*" || $route == "/storage/*"){
				// Requesting storage directory
				try {
				  	if (fs.existsSync(global.app_storage_dir + "/" + Object.values(req.params).join("/"))) {
				    	// if file exists
						res.sendFile(global.app_storage_dir + "/" + Object.values(req.params).join("/"));	
				  	}else{
				  		res.send(404, 'FILE NOT FOUND');
				  	}
				} catch(err) {
				  	res.send(404, err);
				}
			}else{
				// Other routers
				// Prepare the passed parameters
				var endpoint_parameters = {
					Headers : req.headers,
					Request : req,
					Response : res,
					Global : global,
					Model :  await require('./core_model') 
				}

				// Define if middleware is passed, as inital the default value of it is true
				var is_middleware_passed = true;

				// Check if endpoint has middleware
				// Loop every middleware too call its function
				await $route_middleware.forEach(async $middleware => {
					// Each middleware must return two values True and False 
					// To tell the router if it should continue to the controller or not
					if(typeof $middleware == 'string'){
						// Defines middleware paramters
						const middleware_parameters = {
							Headers : req.headers,
							Request : req,
							Global : global,
							Model :  await require('./core_model') 
						};
						// if middleware is a string of a path to middleware, call the file and the function
						const middleware_path = env.path.middleware + env.prefix.middleware + $middleware;
						// Defined middleware response
						let middleware_response = null;
						try {
							// Call the middleware with passed parameters
							var run_middleware = await require(middleware_path)(middleware_parameters, function(callback){ 
								middleware_response = callback._message; 
								if (callback._data != undefined) {
									Object.assign(endpoint_parameters, { MiddlewareData : callback._data });
								}
							});
						} catch(e){
							error_handler(e);
						}
						// if middleware returns true
						if (run_middleware == true) {
							is_middleware_passed = true;
						}else{
							// If middleware returns false
							is_middleware_passed = false;
							// Send the response
							res.send(middleware_response);
						}
					}else{
						// Controller format is not valid
						is_middleware_passed = false;
						helper.print.log('Make sure middleware is a string of path to middleware file or a function'.red);
					}
				})

				// Continue to controller only if middleware is passed or no middleware at all
				if (is_middleware_passed == true) {
					// Check if controller is a string or a function
					// if the controller is a function call the function directly to run endpoint
					if (typeof $route_controller == 'function') {
						helper.print.log('Accessing '+ $route_controller + ' controller'.cyan);
						// Directly call the function
						$route_controller(endpoint_parameters);
					}else if(typeof $route_controller == 'string'){
						helper.print.log('Accessing '+ $route_controller.cyan + ' controller'.white);
						// if controller is a string of a path to controller, call the file and the function
						const controller_path = env.path.controllers + env.prefix.controller + $route_controller;
						// Call the controller with passed parameters
						try {
							await require(controller_path)(endpoint_parameters);
						} catch(e){
							error_handler(e);
						}
					}else{
						// Controller format is not valid
						helper.print.log('Make sure controller is a string of path to controller file or a function'.red);
					}
				}
			}
		});
	});
}

