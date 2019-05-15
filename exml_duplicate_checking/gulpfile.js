const gulp = require('gulp');
const path = require('path');
const through = require('through2');
const source = require('vinyl-source-stream')
const yargs = require('yargs');
const os = require('os');

var knownOptions = {
    string: 'path',
    string: 'output',
};
  
// var options = minimist(process.argv.slice(2), knownOptions);
var options = yargs.argv;
if (options.path) {
    // process.chdir(path.join(__dirname));
    process.chdir(options.path);
}
var cwd = process.cwd();
console.log("Currrent Workspace:" + cwd);

/** 默认输出目录 */
var defaultOutputDir = path.join(os.homedir(), "Desktop");

var nowDate = new Date();
function prefixNumber(num, len) {
    len = len || 2;
    return (Math.pow(10, len) + num).toString().substr(1);
}
var nowDateStr = `${nowDate.getFullYear()}${prefixNumber(nowDate.getMonth() + 1)}${prefixNumber(nowDate.getDate())}_${prefixNumber(nowDate.getHours())}${prefixNumber(nowDate.getMinutes())}${prefixNumber(nowDate.getSeconds())}`
var result_log = {
    "检查结果": "......" + nowDateStr + "......"
};

var groupNameMap = {

};

function addGroupNameRecord(groupName, filePath) {
    var filePaths = groupNameMap[groupName];
    if (!filePaths) {
        filePaths = [];
        groupNameMap[groupName] = filePaths;
    }
    if (filePaths.indexOf(filePath) == -1) {
        filePaths.push(filePath);
    }
}

// 获取路径并保存
gulp.task('check_groupname', function () {
    return gulp.src('**/*.exml')
        .pipe(through.obj(function (file, enc, callback) {
            this.push(file.path);
            /**
             * @type string
             */
            var content = file.contents.toString();
            var regExp = /groupName="(\S*)"/g;
            var groupNameResult = content.match(regExp);
            if (groupNameResult) {
                for (var i = 0, len = groupNameResult.length; i < len; ++i) {
                    var groupName = groupNameResult[i].replace(regExp, function(full, value1, index){
                        return value1;
                    });
                    addGroupNameRecord(groupName, path.relative(process.cwd(), file.path));
                }
            } else {
                // addGroupNameRecord("XXXXX", path.relative(process.cwd(), file.path));
            }
            callback();
        }));
});
gulp.task('result_log', function(){
    var stream = source(`result_${nowDateStr}.json`);
    // 整合日志
    for (var groupName in groupNameMap) {
        if (!groupNameMap[groupName] || groupNameMap[groupName].length == 1) {
            delete groupNameMap[groupName];
        }
    }
    result_log.groupNameMap = groupNameMap;

    stream.end(JSON.stringify(result_log, null, 4));
    return stream.pipe(gulp.dest(options.output || defaultOutputDir));;
});

gulp.task('default', gulp.series('check_groupname', 'result_log'));