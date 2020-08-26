module.exports = {
	// Api Version 
	version : '1.0',
	// Json parser configuration
	json_parser : {
		// Limit of request body size in megabyte
		// This usually helps if you transfering large amout of request
		limit: '20mb', 
		extended: true
	},
	// Defines Server Port, Default port is 8881
	port : 8881,
	// Defines wether or not the api should use database
	// Change it to true to use database driver
	use_database : false,
	// Database configuration
	// Suports only one database connection
	database :{
		// Database name
		database: "DATABASE_NAME",
		// Database host / ip address
	    host: "DATABASE_HOST",
	    // Database's port number
	    port: "DATABASE_PORT",
	    // Database username access
	    user: "DATABASE_USER",
	    // Database password
	    password: "DATABASE_PASSWORD"
	},
	path : {
		// Controllers path
		controllers : "../app/controllers/",
		// Models path
		models : "../app/models/",
		// Middleware path
		middleware : "../app/middleware/",
		// Database Configuration Path
		database : "../core/core_database"
	},
	prefix : {
		controller : "controller_",
		model : "model_",
		middleware : "middleware_"
	}
}