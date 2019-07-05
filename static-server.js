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


        var driverReg = /\/[a-zA-Z]\:\//;
        var driverResult = req.url.match(driverReg);
        if(driverResult && driverResult.index == 0){// 有驱动盘符标识
            var driverName = driverResult[0];
            driverName = driverName.substr(1, 1);
            if(driversRegistered.indexOf(driverName) == -1){
                driversRegistered.push(driverName);
                registerRoute(`/${driverName}:`, !isMac ? (driverName + ":\\") : ("/"));
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