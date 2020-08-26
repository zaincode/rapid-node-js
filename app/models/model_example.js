// This file represents a model file
// Model file usually dealing with database, in this case SQL Spesifically
// Or could be any of your business model
// Model only has one parameter which is a database connection to call for SQL query

module.exports = async ({ Database }) => {
	return Database.query(/* Some SQL Query stuff */);
}