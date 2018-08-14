
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;

var connMongoDb = function() {
	
	console.log();
	 var _this = this;
	var _envx = "dev";
	
	//var  db = {};
	//db= { db: { host, port, db } } = config;
	//var connectionString = `mongodb://${host}:${port}/${db}`;
	
	
	var connectionString = "mongodb://"+ config.dev.db.host+ ":"+ config.dev.db.port +"/"+ config.dev.db.db;
	
	return new Promise(function(resolve, reject) {
		if (_this.db) {
			resolve(_this.db);
		} else {
			var __this = _this;
			
		
			MongoClient.connect(connectionString).then (
				
				function(database) {
					__this.db = database;
					resolve(__this.db);
				},
				
				function(err) {
					console.log("Error connecting: " + err.message);
					reject(err.message);
				}
			)
		}
	})
}  


module.exports = function() {
	
	return connMongoDb;
}