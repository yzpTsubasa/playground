module.exports = function(app){
    app.use('/cgi/:purpose', function(req, res){
        var params = req.method == "GET" ? req.query : req.body;
        var headers = req.headers;
        switch(req.params.purpose)
        {
            case 'saveproduct':
            fs.writeFile(path.join(__dirname,"/upload/productlist.json"), JSON.stringify(params),(err) => {
                if (err) throw err;
                res.send(JSON.stringify({code:0,data:params}));
                console.log('It\'s saved!');
            });
            break;
            //确认文件进度
            case 'checkfile':
            if(headers.filename && headers.position && headers.hash){
                var filepath = __dirname + "/upload/" + headers.filename; 
                fs.access(filepath, (err)=>{
                    if(err){
                        res.send(result(0, {position:0, hash:headers.hash}))
                    }else{
                        fs.stat(filepath, (err, stats)=>{
                            if(err){
                                res.send(result(-1, null, err.message));
                            }else{
                                res.send(result(0, {position:stats.size}));
                            }
                        });
                    }
                });
            }else
            {
                res.send(result(-1, params, 'Unavailable file!'))
            }
            break;
            case 'uploadfile':
            if(params.hash && params.size && params.filename && params.position && params.fragment){

            }else{
                res.send(result(-1, params, 'Unavailable file!'));
            }
            case 'writefile':
            if(headers.filename && headers.position && headers.hash)
            {
                var filepath = __dirname + "/upload/" + headers.filename; 
                var writeStream = fs.createWriteStream(filepath, {flags:'a+'});
                var writeError = false;
                writeStream.on('error', (err)=>{
                    writeError = true;
                    res.send(result(-1, null, err.message));
                });
                writeStream.on('finish', (err)=>{
                    if(writeError){
                        return;
                    }
                    fs.stat(filepath, (err, stats)=>{
                        if(err){
                            res.send(result(-1, null, err.message));
                        }else{
                            res.send(result(0, {position:stats.size}));
                        }
                    });
                });
                req.on('data',(data)=>{
                    writeStream.write(data);
                });
                req.on('end',(data)=>{
                    writeStream.end();
                });
            }else{
                res.send(result(-1, headers, 'Unavailable file!'));
            }
            break;
            default:
            res.send(result(404, null, 'Illigel request!'))
            break;
        }
    });
    function result(code, data, msg)
    {
        return JSON.stringify({code:code, data: data, msg:msg});
    } 
}
