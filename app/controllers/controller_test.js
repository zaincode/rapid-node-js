// This controller file represents an endpoint
// With parameters such as Request, Response and Model

module.exports = async ({ Request, Response, Model, MiddlewareData }) => {
	// Example of using model in ./app/models/ directory
	var userModel = await new Model('example');
	// Send response
	Response.send({ status : 200, data : MiddlewareData });
}