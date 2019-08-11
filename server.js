var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Constants = require('./Constant');
const winston = require('./winstonlog')
var validation = require('./validation')

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
app.use('/download', express.static('.uploads'))

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
	for(let j=0; j<req.files.length; j++) {
		let file = req.files[j]
		let fileObj = {
			file_name: file.originalname,
			file_path: './.uploads/' + file.originalname,
			file_size: file.size,
			data: {}			
		}
		try {
			let data = fs.readFileSync(fileObj.file_path);
			let records = JSON.parse(data);
			let tsKey = null, valKey = null, element = null;
			if(records.length > 0) {
				element = records[0]
				Object.keys(element).forEach(key => {
					if (!tsKey) tsKey = validation.isValidTimeStamp(element, key)? key: null
					if (!valKey) valKey = validation.isValidValue(element, key)? key: null
				});
			}
			if(tsKey && valKey) {
				for (let i=0; i<records.length; i++) {
					element = records[i]
					let lsKey = new Date(element[tsKey]).toISOString().slice(0, 10)
					if(Object.keys(fileObj.data).indexOf(lsKey) == -1) {
						fileObj.data[lsKey] = element[valKey]
					}
				}
			} else {
				fileObj['tsKey'] = tsKey? tsKey: 'failed to get timestamp col'
				fileObj['valKey'] = valKey? tsKey: 'failed to get value col'
			}
			fileObj['data'] = fileObj.data
			saveFileData(fileObj)
		} catch (err) {
			console.log(err)
			winston.error("Error when extracting the data " + err)
			fileObj['msg'] = 'failed to read records'
		}
		resData.push(fileObj)
	}
	let response = {
		'status': true,
		'data': resData
	}
	res.status(200).json(response)
})

app.get('/getfiles', function (req, res, next) {
	FileModel.find({}).select({ 'file_name': 1, '_id': 1, 'file_size': 1})
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

app.listen(3009, function () {
	console.log('Starting react-files demo on port 80')
})
