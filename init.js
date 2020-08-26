// rapid-node-js-v2
// Created by Royan Zain
// October 28th 2019
// And here we go...

// And Oh, Normaly you wouldn't have to edit any of these code below
var express = require("express"), 
	path = require('path'), 
	app = express(), 
	env = require("./config/env"), 
	bodyParser = require("body-parser"), 
	router = express.Router(),
	core_router = require('./core/core_router'); 

// Use the JSON body parser
app.use(bodyParser.json(env.json_parser));

// Use Express.Js router
app.use("/", router);

// Takes every request comes in and forward it to core router
core_router(router, require('./global'));

// Start the server
app.listen(env.port);
