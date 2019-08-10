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

async function isValidTimeStamp() {
	try {
		let check = await mongoose.connect(Constants.dburl, { useNewUrlParser: true });
		console.log(check);
	} catch (error) {
		console.log(error);
	}
}

async function isValidValue(element, key) {
	try {
		console.log
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
			winston.error('Error occured while inserting data ' + err);
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
				let keys = Object.keys(element)
				let tsKey = null, valKey = null;
				keys.forEach(key => {
					if(!tsKey) tsKey = isValidTimeStamp(element, key)
					else if(!valKey) valKey = isValidValue(element, key)
				});
				console.log(tsKey, valKey)
				console.log(Object.keys(element))
				// let lsKey = new Date(element.ts).toISOString().slice(0, 10)
				// fileObj.data[lsKey] = element.val
			});
			// fileObj['data'] = fileObj.data
			// saveFileData(fileObj)
		} catch (ex) {
			fileObj['msg'] = 'failed to read records'
		}
		resData.push(fileObj)
	})
	let response = {
		'status': true,
		'data': resData
	}
	res.status(200).json(response)
})

app.get('/getfiles', function (req, res, next) {
	FileModel.find({}).select({ 'file_name': 1, '_id': 1})
		.then(async resData => {
			let response = {
				'status': true,
				'data': resData
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error('Error occured while inserting data ' + err);
		})
})

app.post('/getfileinfo', jsonParser, function (req, res, next) {
	console.log(req.body._id)
	FileModel.findOne({ _id: req.body._id })
		.then(async resData => {
			console.log(resData)
			let response = {
				'status': true,
				'data': [resData]
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error('Error occured while geting the file info ' + err);
		})
})

app.get('/deleteAll', function (req, res, next) {
	FileModel.remove()
		.then(async resData => {
			let response = {
				'status': true,
				'data': []
			}
			res.status(200).json(response)
		})
		.catch(err => {
			console.log(err);
			winston.error('Error occured while inserting data ' + err);
		})
})

app.listen(80, '0.0.0.0', function () {
	console.log('Starting react-files demo on port 80')
})
