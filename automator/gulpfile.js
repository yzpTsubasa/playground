const gulp = require("gulp");
const clean = require("gulp-clean");
const through = require('through2');
const progress = require('progress-stream');
const {argv} = require('yargs')
const yml = require('yml')

const progressStream = progress({
    length: 10,
    time: 100,
    objectMode: true
});

progressStream.on('progress', function(stats) {
    console.log(Math.round(stats.percentage) + '%');
})

function copyTmp() {
    return gulp.src("E:/tsubasa/notes/markdown/版本详情.md")
    .pipe(progressStream)
    .pipe(through.obj(readPlain(onGetMdFile)))
    .pipe(gulp.dest("./tmp"))
}
function cleanTmp() {
    return gulp.src("./tmp/*")
    .pipe(clean())
}
/**
 * 
 * @param {vinyl} chunk 
 * @param {string} enc 
 * @param {(error, chunk: vinyl.File) => any} cb 
 */
function customPipe(chunk, enc, cb) {
    console.log("customPipe", chunk.base, chunk.basename, chunk.path);
    setTimeout(() => {
        console.log("customPipe Done");
        cb(null, chunk);
    }, 0)
}
function customTask(cb) {
    console.log("CustomTask");
    setTimeout(() => {
        console.log("CustomTask Done");
        cb();
    }, 0);
}

/**
 * 
 * @param {string} content 
 */
function onGetMdFile(content) {
    console.log(argv);
    let reg = /\|\s+\|\s*\d*\s*\|\s*\d+\s*\|\s*((\w+)\s*\|\s*[\.\d]+\s*\|\s*\d+)\s*\|/g;
    let ret = null;
    while (ret = reg.exec(content)) {
        console.log(ret[1], ret[2]);
    }
}

/**
 * 
 * @param {(content: string) => void} callback 
 */
function readPlain(callback) {
    return (chunk, enc, cb) => {
        callback && callback(chunk.contents.toString(enc));
        cb(null, chunk);
    }
}

function getFiles(callback) {
    return (chunk, enc, cb) => {
        callback && callback(chunk.path);
        cb(null, chunk);
    }
}


var tasks = [
    first_exist([
        "E:/tsubasa/notes/markdown/版本详情.md",
        "C:/Users/Tsubasa/Documents/projects/notes/markdown/版本详情.md",
    ], "md_file"),
    readYml,
    cleanTmp,
    copyTmp,
    customTask,
];

function readYml(cb) {
    let cfg = yml.load("E:/tsubasa/python/automator/cfg/dldl/copy_minigame_version.yml");
    cb();
}

function first_exist(src, key) {
    return function(cb) {
        return gulp.src(src, {allowEmpty: true})
        .pipe(through.obj(getFiles((filepath) => {
            console.log(filepath);
        })))
    }
}

gulp.task("default", gulp.series(tasks));

