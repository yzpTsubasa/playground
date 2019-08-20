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
        if (req.url == '/favicon.ico') {
            var data = 'AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABILAAASCwAAAAAAAAAAAAAqyHoAKsh6ACrIegMqyHpHKsh6rSrIeukqyHr9Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/JrRu/yCaXv8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/SCZXekgmV2uIJldSCCbXgMgmV4AIJleACrIegAqyHoKKsh6firIeuwqyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/ya2b/8hnF//IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3tIJldfyCaXgogmV4AKsh6AyrIen4qyHr8Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8mtm//IZxf/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV39IJldfyCbXgMqyHpHKsh67CrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/JrZv/yGcX/8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3tIJldSCrIeq0qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/ya2b/8hnF//IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV2uKsh66SrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8mtm//IZxf/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/yCZXekqyHr9Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/JrZv/yGcX/8dl1v/HZdb/x6YXP8gmV3/IJld/yGZXv8hmV7/IZle/yCZXf8gmV3/HZhb/x2XW/8fmV3/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/IJld/SrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/ya2b/8gnF//IZle/1eyhf+Ny6z/ndK4/6fXv/+r2cL/rtrE/6/axf+u2sT/rNnD/6jXwP+TzrH/ZLiP/yueZf8emFz/IJld/yCZXf8gmV3/IJld/yCZXf8gmV3/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/ynIef8ktW7/H5te/yGZXv99xKH/7vfz///////////////////////////////////////////////////////6/fv/stzH/zejbv8fmFz/IJld/yCZXf8gmV3/IJld/yCZXf8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8pyHn/Nr17/zypc/87pXH/ecKe//P69v///////////////////////////7Dbxf/G5dX/////////////////////////////////odS7/yKaX/8gmV3/IJld/yCZXf8gmV3/IJld/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/3Pap//U7uH/5fPs/+bz7f/4/Pr////////////////////////////E5NT/MqFq/0aqef/a7uT////////////////////////////a7uT/MqFq/x+YXP8gmV3/IJld/yCZXf8gmV3/Ksh6/yrIev8qyHr/Ksh6/ynIef9Azoj/3vbq////////////////////////////////////////////3vDn/0mse/8dmFv/HZhb/121if/q9vD//////////////////////+Py6/86pXD/Hphc/yCZXf8gmV3/IJld/yCZXf8qyHr/Ksh6/yrIev8qyHr/KMd4/1HSk//x+/b///////r9+//n9O7/9vv5//////////////////H49f9muZD/Hphb/yCZXf8gmV3/H5hc/3bAm//2+/j/////////////////6fXv/0CodP8emFz/IJld/yCZXf8gmV3/IJld/yrIev8qyHr/Ksh6/yrIev8nx3j/VtOV//P89///////1+3i/0qse/+94c/////////////8/f3/h8io/yCZXv8gmV3/IJld/yCZXf8gmV3/I5pf/5HMr//9/v3////////////r9vH/RKl3/x6YXP8gmV3/IJld/yCZXf8gmV3/Ksh6/yrIev8qyHr/Ksh6/yfHeP9b1Jj/9fz5///////R6t7/LZ9n/7PcyP///////////6bWvv8km2D/HZhb/yCZXf8gmV3/IJld/yCZXf8emFz/Jpxi/6fXv//+/////////+/38/9Iq3r/Hphb/yCZXf8gmV3/IJld/yCZXf8qyHr/Ksh6/yrIev8qyHr/J8d4/1zVmf/2/fn//////9Hq3v8voGj/tNzI///////v+PP/ismq/3G+mP9DqXf/H5hc/yCZXf8gmV3/H5hc/zikbv9uvZb/icmp/+338v//////8Pj0/0qsfP8dmFv/IJld/yCZXf8gmV3/IJld/yrIev8qyHr/Ksh6/yrIev8nx3j/W9WZ//b8+f//////0ere/y+gaP+03cn///////7//v/+/v7//////4DFo/8cl1v/IJld/yCZXf8cl1v/ZbiP//z+/f/////////////////y+fb/TK19/x2YW/8gmV3/IJld/yCZXf8gmV3/Ksh6/yrIev8qyHr/Ksh6/yfHeP9a1Jj/9fz5///////S6t7/L6Bo/7Teyf//////////////////////gMWj/xyXW/8gmV3/IJld/x2XW/9ftov/6fXv/+338v/s9vH/7ffy/+Hx6v9MrX3/HZhb/yCZXf8gmV3/IJld/yCZXf8qyHr/Ksh6/yrIev8qyHr/J8d4/1nUl//y+/f//////8/q3f8ys3P/s+nO//////////////////////+AxaP/HJdb/yCZXf8gmV3/IJld/yqeZf9BqHX/Qah1/0Godf9BqHX/QKd0/yicY/8gmV3/IJld/yCZXf8gmV3/IJte/yrIev8qyHr/Ksh6/yrIev8pyHn/OcyD/2nYof9t2qT/XtSa/y7IfP+x687//////////////////////4DFo/8cl1v/IJld/yCZXf8emFz/QKd0/4bHp/+IyKj/iMio/4jIqf+BxaT/NaJs/x+YXP8gmV3/IJld/yGdYP8mtW7/Ksh6/yrIev8qyHr/Ksh6/yrIev8pyHr/J8d4/ybHeP8nx3j/Kch5/6rpyf//////////////////////gMWj/xyXW/8gmV3/IJld/xyXW/9luY///v7+//////////////////T69/9NrX7/HZhb/yCZXf8hnF//Jrdw/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8nx3j/l+S+//////////////////////9/xKL/G5da/x+YXf8fmF3/G5da/2S4jv/7/fz/////////////////8fn1/0ytff8dl1v/IZxf/ya3cP8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yfHeP9g1pv/8/z3/////////////////4nJqf8tn2f/MaBp/zGgaf8tn2f/cL2X//v9/P/////////////////x+fX/TK19/x6bXf8mt3D/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/y3JfP+H4LT/7frz////////////6/Xw/9rt5P/a7uT/2+7k/9rt5P/n8+3///////////////////////X59/9OsYD/JLZu/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Kch6/yvIe/9U05T/gN6v/4/iuf+W5L7/nebC/6Lnxf+j6Mb/pejH/6joyP+q6cr/rOrL/63qzP+v6s3/qebI/0PFhf8ox3n/Ksh6/yrIev8qyHr/Ksh6/yrIev0qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yjHef8mx3j/J8d4/yfHeP8nx3j/KMd5/yjHef8oyHn/Kch5/ynIef8qyHr/Ksh6/yrIev8ryHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr9Ksh66SrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIeukqyHqtKsh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6rSrIekcqyHrsKsh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIeuwqyHpHKsh6AyrIen4qyHr8Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr8Ksh6firIegMqyHoAKsh6CirIen4qyHrsKsh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh67CrIen4qyHoKKsh6ACrIegAqyHoAKsh6AyrIekcqyHqtKsh66SrIev0qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr/Ksh6/yrIev8qyHr9Ksh66SrIeq0qyHpHKsh6AyrIegAqyHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
            var img = new Buffer(data, 'base64');
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