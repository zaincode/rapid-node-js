const env = require("../config/env");
class Model {
	// Model factory requires the model filename as parameter
	// A database connection will be passed on as parameter to the model object
	constructor(name) {
		this.name = name;
		return this.run_model();
	}
	// Run the model object
	async run_model() {
		if (env.use_database == true) {
			const DatabaseConnection = await require(env.path.database)();
			return require(env.path.models + env.prefix.model + this.name)({ Database : DatabaseConnection });
		}else{
			return null;
		}
	}
}
// Export ModelFactory Object
module.exports = Model;