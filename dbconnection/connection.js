/* eslint-disable no-tabs */
var winston = require('../winstonlog');
const mongoose = require('mongoose');
const Constants = require('../Constant')

module.exports.mongo_init = async () => {
	try {
		//  await mongoose.connect(Constants.dburl).then(res=>{
		// 	console.log("connect");

		// })
		// .catch(err=>{
		// 	console.log('====================================');
		// 	console.log(err);
		// 	console.log('====================================');
		// })
		// mongoose.set('debug', true);

		// var db = mongoose.connection;
		// db.on('error', (err) => {
		// 	console.log("Error while connecting to database");
		// 	winston.error("Database error ocurred in connection.js", err);
		// });

		// return mongooseObj;

		mongoose.connect(Constants.dburl, function () { /* dummy function */ })
			.then(() => {
				console.log("Connected");
				
			})
			.catch(err => { // mongoose connection error will be handled here
				console.error('App starting error:', err.stack);
				process.exit(1);
			});
	} catch (e) {
		winston.error("Some error ocurred in connection.js  ", e);
	}
};