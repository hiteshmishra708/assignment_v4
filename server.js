var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Constants = require('./Constant');
const winston = require('./winstonlog')

async function connectDB() {
	try {
		let check = await mongoose.connect(Constants.dburl, { useNewUrlParser: true });
		console.log(check);
	} catch (error) {
		console.log(error);
	}
}
connectDB();

const FileModel = require('./models/index');


var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')
var compiler = webpack(config)

var app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './.uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})

var upload = multer({ storage: storage })
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: true,
	quiet: false,
	historyApiFallback: true,
	stats: {
		colors: true
	}
}))

app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}))

app.use('/assets', express.static('assets'))

app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

async function saveFileData(fileObj) {
	let fileModel = new FileModel(fileObj);
	await fileModel.save()
		.then(async res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
			winston.error("Error occured while inserting data " + err);
		})
}

app.post('/files', upload.any(), async function (req, res, next) {
	if (!req.files) {
		return next(new Error('No files uploaded'))
	}
	let resData = [];
	req.files.forEach((file) => {
		let fileObj = {
			file_name: file.originalname,
			file_path: './.uploads/' + file.originalname,
			data: {}
		}
		try {
			let data = fs.readFileSync(fileObj.file_path);
			let records = JSON.parse(data);
			records.forEach(element => {
				let lsKey = new Date(element.ts).toISOString().slice(0, 10)
				fileObj.data[lsKey] = element.val
			});
			fileObj["data"] = fileObj.data
			saveFileData(fileObj)
		} catch (ex) {
			fileObj["msg"] = "failed to read records"
		}
		resData.push(fileObj)
	})
	let response = {
		"status": true,
		"data": resData
	}
	res.status(200).json(response)
})

app.get('/getfiles', function (req, res, next) {
	FileModel.find({}).select({ "file_name": 1, "_id": 1})
		.then(async resData => {
			let response = {
				"status": true,
				"data": resData
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error("Error occured while inserting data " + err);
		})
		// res.status(200).json({"status":true,"data":[{"_id":"5d4d7ec4f79ff63efc511b82","file_name":"abc1.json"},{"_id":"5d4d7fc907f29b3cec1151e1","file_name":"abc1.json"},{"_id":"5d4d7fd507f29b3cec1151e2","file_name":"abc1.json"},{"_id":"5d4d7fd507f29b3cec1151e3","file_name":"abc1.json"},{"_id":"5d4d81591f98ab3c340436b5","file_name":"abc1.json"},{"_id":"5d4d82c0166ef0113cdc57c1","file_name":"THERM0001.json"}]})
})

app.post('/getfileinfo', jsonParser, function (req, res, next) {
	FileModel.findOne({ _id: req.body._id })
		.then(async resData => {
			let response = {
				"status": true,
				"data": [resData]
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error("Error occured while geting the file info " + err);
		})
})

app.post('/filesearch', function (req, res, next) {
	let filename = "Est"
	FileModel.find({ file_name: { $regex: `^${filename}`, $options: 'i' } })
		.then(async resData => {
			let response = {
				"status": true,
				"data": resData
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error("Error occured while inserting data " + err);
		})
})

app.get('/deleteAll', function (req, res, next) {
	FileModel.remove()
		.then(async resData => {
			let response = {
				"status": true,
				"data": resData
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error("Error occured while inserting data " + err);
		})
})

app.listen(8080, function () {
	console.log(`Starting react-files demo on port 8080`)
})
