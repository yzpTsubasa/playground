var express  = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer'); 

var http = require('http');
var https = require("https");
var os = require("os");

process.chdir(__dirname);

/*---自定义组件---*/
//上传文件demo
var uploadFile = require("./upload-file");
//静态文件服务器
var staticServer = require("./static-server");


var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

//由于是访问1024以下端口，在mac osx 或者 linux系统中，要使用 sudo 运行
var PORT = 8686;
var SSLPORT = 18686;
var localIP = "localhost";
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
	var alias = 0;
	ifaces[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			return;
		}

		if (alias >= 1) {
			// this single interface has multiple ipv4 addresses
			console.log(ifname + ':' + alias, iface.address);
			localIP = iface.address;
		} else {
			// this interface has only one ipv4 adress
			console.log(ifname, iface.address);
		}
		localIP = iface.address;
		++alias;
	});
});


//启用文件上传demo
uploadFile(app);
//启用静态服务器
staticServer(app, null && localIP);

var privateKey  = fs.readFileSync('./crt/private.pem', 'utf8');
var certificate = fs.readFileSync('./crt/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT, "0.0.0.0", function(){
	console.log('HttpServer listening on %s:%s', localIP, PORT);
});
httpsServer.listen(SSLPORT, "0.0.0.0", function(){
	console.log('HttpsServer listening on %s:%s', localIP, SSLPORT);
});
// var server = app.listen(PORT, function(){
//     console.log('Server listening on %s', PORT);
// });

