var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')
var compiler = webpack(config)

var app = express()
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

app.post('/files', upload.any(), function (req, res, next) {
	if (!req.files) {
		return next(new Error('No files uploaded'))
	}
	let resData = []
	req.files.forEach((file) => {
		let fileData = {
			"file": file.originalname,
			"rows": {},
		}
		try {
			let data = fs.readFileSync('./.uploads/' + file.originalname);
			let records = JSON.parse(data);
			records.forEach(element => {
				let lsKey = new Date(element.ts).toISOString().slice(0, 10)
				fileData.rows[lsKey] = element.val
			});
		} catch (ex) {
			fileData["msg"] = "failed to read records"
		}
		resData.push(fileData)
	})
	let response = {
		"status": true,
		"data": resData
	}
	res.status(200).json(response)
})

app.listen(8080, function () {
	console.log(`Starting react-files demo on port 8080`)
})
