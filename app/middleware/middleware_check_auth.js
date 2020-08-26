// This file represents a single middleware
// This code will execute as soon as api requested and before accessing the controller
// Each middleware has 2 main parameter which is Request and Model
// But in case you'd like to return response inside the middleware (in case of failed middleware)
// Theres response parameters

module.exports = ({ Request, Model }, callback) => {
	// If middleware fails, returns a callback
	// middleware callback has two parameters, _message and _data both of them are optional
	// _message is where you want to put your response it can be object or string and etc.
	// _data is when you want to pass any kinds of data from this middleware to the controller next.
	callback({ 
		_message : {
			// Example of middleware responses
			status : false,
			message : "Failed authenticating your request"
		}, 
		_data : { is_data_from_middleware:  true } 
	});
	// a middleware has to return boolean value to indicates if the middleware is success or fails
	// Change this value to false if you want to see a failed middleware
	return true;
}