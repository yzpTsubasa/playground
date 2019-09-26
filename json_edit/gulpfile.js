const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const json_editor = require('gulp-json-editor');
const vinyl_paths = require('vinyl-paths');

const task_input = {
    /** 配置表路径 */
    json_file: 'E:/projects/dldl_WX/dldl_h5/resource/default.res.json',
    /** 配置表目录 */
    root_dir: "",
    debug_outdir: './out',
    /** 资源目录 */
    res_dir: "E:/projects/dldl_WX/dldl_h5/resource/assets/cardhero",
    cardhero_dir: "assets/cardhero"
};

const task_output = {
    res_file_list: [],
}

task_input.root_dir = path.dirname(task_input.json_file);

console.log("解析", JSON.stringify(task_input));

gulp.task('check_default_res', function() {
    let role_all_files = [];
    return gulp.src(task_input.json_file)
        .pipe(json_editor(function(json){

            for (let i = json.resources.length - 1; i >= 0; --i) {
                let resource = json.resources[i];
                if (resource.url.indexOf(task_input.cardhero_dir) == 0) {
                    // console.log(JSON.stringify(resource));
                    role_all_files.push(resource.url);
                    json.resources.splice(i, 1);
                }
            }
            
            role_all_files.sort();
            console.log(role_all_files.length);

            let res_keys = [];
            
            for (let file of task_output.res_file_list) {
                let extname = path.extname(file);
                let filename = path.basename(file, extname);
                let name = `${filename}${extname.replace(".", "_")}`;
                let type = extname == '.json' ? 'json' : 'image';
                let url = file;
                json.resources.push({
                    "name": name,
                    "type": type,
                    "url": url,
                });
                res_keys.push(name);
            }

            for (let group of json.groups) {
                if (group.name == 'role_all') {
                    group.keys = res_keys.join(",");
                    break;
                }
            }

            try {
                fs.writeFileSync(`${task_input.debug_outdir}/role_all_files.json`, JSON.stringify(role_all_files, null, 4));
            } catch (error) {
                console.log(error);
            }

            return json;
        }, {
            'indent_char': '\t',
            'indent_size': 1,
            'brace_style': 'expand',
        }))
        .pipe(gulp.dest(task_input.root_dir));
});

gulp.task('traversal_res_dir', function() {
    task_output.res_file_list.length = 0;
    const vp = vinyl_paths();
    return gulp.src(`${task_input.res_dir}/**/*`)
        .pipe(vp)
        .on('end', function() {
            for (let p of vp.paths) {
                try {
                    let stat = fs.lstatSync(p);
                    if (stat.isFile()) {
                        task_output.res_file_list.push((p.substr(task_input.root_dir.length + 1)).replace(/\\/g, '/'));
                    }
                } catch (error) {
                    
                }
            }
            task_output.res_file_list.sort();
            console.log(task_output.res_file_list.length);
            try {
                fs.writeFileSync(`${task_input.debug_outdir}/res_file_list.json`, JSON.stringify(task_output.res_file_list, null, 4));
            } catch (error) {
                console.log(error);
            }
        });
});



gulp.task('default', gulp.series("traversal_res_dir", "check_default_res"));

