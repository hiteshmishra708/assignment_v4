const mongoose = require('mongoose')
const constants = require('./constant')
async function connectDB() {
	try {
		let check = await mongoose.connect(constants.dburl, { useNewUrlParser: true });
		console.log(check);
	} catch (error) {
		console.log(error);
	}
}

module.exports.connectDB = connectDB