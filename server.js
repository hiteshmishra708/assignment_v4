var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser')
const constants = require('./helper/constant')
const winston = require('./helper/winstonlog')
var validation = require('./helper/validation')
var dbConnection = require('./helper/dbConnection')

dbConnection.connectDB();
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
			let tsKey = null, valKey = null;
			if(records.length > 0) {
				Object.keys(records[0]).forEach(key => {
					if (!tsKey) tsKey = validation.isValidTimeStamp(records[0], key)? key: null
					if (!valKey) valKey = validation.isValidValue(records[0], key)? key: null
				});
			}
			let i = records.length; 
			while(i--) fileObj.data[new Date((records[i])[tsKey]).toISOString().slice(0, 10)] = (records[i])[valKey]
			fileObj['data'] = fileObj.data
			fileObj['tsKey'] = tsKey? tsKey: 'failed to get timestamp col'
			fileObj['valKey'] = valKey? tsKey: 'failed to get value col'
			dbConnection.saveFileData(fileObj)
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
	FileModel.find({}).sort({_id: -1}).select({ 'file_name': 1, '_id': 1, 'file_size': 1})
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
app.listen(constants.port, function () {
	console.log('Starting react-files demo on port ' + constants.port)
})
