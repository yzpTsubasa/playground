module.exports = function(app, localIP) {
    var express = require('express');
    var serveIndex = require('serve-index');
    var path = require('path');
    var os = require('os');
    var open = require('open');
    
    open(`http://${localIP || "localhost"}:8686`);

    const log4js = require('log4js');
    log4js.configure({
        appenders: { staticserver: { type: 'file', filename: 'staticserver.log' } },
        categories: { default: { appenders: ['staticserver'], level: 'debug' } }
      });
       
    const logger = log4js.getLogger('staticserver');
    logger.debug('Entering staticserver');

    //简单判断是在mac osx或者在windows中
    var isMac = __dirname.indexOf('/') == 0;
    var defaultDir = path.join(os.homedir()); // , "Desktop"
    var urlMap = {
        '/': defaultDir, //
    };
    console.log("[Route]\t\t\t[Path]");
    console.log("-------\t\t\t------");

    var trustIps = [
        "127.0.0.1",
        "localhost",
    ];
    var driversRegistered = [];
    //hook处理：被web构建后的文件
    app.use(function(req, res, next) {
        if (req.url.match(/\/favicon\.(?:ico|png)/)) {
            var data = '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';
            var img = Buffer.from(data, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img); 
            return;
        }

        var isTrusted = !trustIps.every(function (ip) {
            return req.ip.indexOf(ip) == -1;
        });
        // 全部可信
        isTrusted = true;
        if (!isTrusted) {
            next(200, `${req.ip} access denied~`);
            return;
        }
        //要排除/swf_modules目录,排除lv目录
        // if(req.url.indexOf("/static/flash") != -1 && req.url.indexOf("/static/flash/swf_modules") == -1 && req.url.indexOf("/static/flash/lv") == -1)
        // {
        //     req.url = req.url.replace(/-[0-9a-zA-Z_]+\./, ".");
        //     // console.log("Redirect to %s", req.url)
        // }
        var logReg = /\/(trace|debug|info|warn|error|fatal)\//;
        var logResult = req.url.match(logReg);
        if (logResult && logResult.index == 0) {
            var logType = logResult[1];
            var logData = decodeURI(req.url.substr(logResult[0].length));
            logger[logType](logData);
            // next(200, `{code: 0, data: "${logData}"}`);
            // next();
            res.status(200).send(`{"code": 0, "data": "${encodeURI(logData)}"}`);
            return;
        }

        var stopServerReg = /^\/kill/;
        if (req.url.match(stopServerReg)) {
            res.status(200).send(`{"code": 0, "data": "Kill server successfully!"}`);
            setTimeout(() => process.exit(0), 10);
            return;
        }


        var driverReg = /\/([a-zA-Z]+)(\:||%3A)\//;
        var driverResult = req.url.match(driverReg);
        if(driverResult){// 有驱动盘符标识
            var driverName = driverResult[1];
            if(driversRegistered.indexOf(driverName) == -1){
                driversRegistered.push(driverName);
                registerRoute(`/${driverName}:`, !isMac ? (driverName + ":\\") : ("/"));
                registerRoute(`/${driverName}%3A`, !isMac ? (driverName + ":\\") : ("/"));
            }
        }

        next();
    });
    for (var url in urlMap) {
        registerRoute(url, urlMap[url]);
    }
    function registerRoute(route, url){
        //目录访问，无法访问文件，还要指定express.static才能访问
        app.use(route, serveIndex(url, { icons: true }));
        var options = {
            setHeaders: function(res, path, stat) {
                res.set("Access-Control-Allow-Origin", "*");
            }
        };
        //文件访问
        app.use(route, express.static(url, options));   

        var tabLen = Math.ceil(((8 * 3) - route.length) / 8);
        var tab = "";
        while (tabLen) {
            tab += "\t";
            tabLen--;
        }
        console.log("%s%s%s", route, tab, url);
    }
    console.log("-------\t\t\t------");
};