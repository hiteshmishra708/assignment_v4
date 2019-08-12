const mongoose = require('mongoose')
const constants = require('./constant')
const FileModel = require('../models/index');
async function connectDB() {
	try {
		let check = await mongoose.connect(constants.dburl, { useNewUrlParser: true });
		console.log(check);
	} catch (error) {
		console.log(error);
	}
}

async function saveFileData(fileObj) {
	let fileModel = new FileModel(fileObj);
	await fileModel.save()
		.then(async res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
			winston.error('Error saving the data in mongodb ' + err);
		})
}

module.exports.connectDB = connectDB
module.exports.saveFileData = saveFileData
