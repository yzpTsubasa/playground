const gulp = require("gulp");
const replace = require('gulp-replace');
const bom = require('gulp-bom');
const del = require('del');


gulp.task("copy_files", function() {
    return gulp.src(srcFiles, {
        base: srcBase
    })
    .pipe(gulp.dest(targetDir));
});
gulp.task("del_files", function(){
    return del(srcFiles, {
        force: true,
    });
});
gulp.task("move_files", gulp.series("copy_files", "del_files"));

var srcFile = "E:/projects/DLDL_SVN/src/shell/";
var srcBase = "E:/projects/DLDL_SVN/src/shell/";
var targetDir = "E:/projects/DLDL_SVN/src/src_ext/shell/";
var fileNames = [
    "WndChoiceServer",
    "WndLogin",
    "WndBlack",
    "WndChoiceServerIp",
    "WndPublicNotice",
    "WndSvrConnectTips",
    "WndLoading",
    "WndBattleCom",
    "WndBattleTop",
    "WndBattle",
    "WndOfflineInfo",
    "WndUIBottom",
    "WndFstEnterGame",
    "WndGuide2",
    "WndGuideAward",
    "WndLevUp",
    "WndTipItem",
    "Wnd_BossAppear",
    "WndActMapInfo",
    "WndBattleInfo",
    "WndBattleChatFull",
    "WndBattleTopFull",
    "WndTaskPrgShow",
    "WndUserOther",
    "WndConfirm",
    "WndEmoji",
    "WndRadio",
    "WndLevGet",
    "WndLevGetBlack",
    "WndRoleInfo",
    "WndRoleHeroTbl",
    "WndFashionUse",
    "WndGuideTeam",
    "WndUserInfo",
    "WndGameSetting",
    "WndFace",
    "WndName",
    "WndFamilyGuide",
    "WndGuideLast",
    "WndRechargeFirst",
    "WndConvert",
    "WndEMoney2Money",
    "WndOriginalPainting",
    "WndTipSkill",
    "WndBattleAct",
    "WndMainAchieve",
    "WndBattleChat",
    "WndTask",
    "WndBattleChatEx",
    "WndGetPet",
    "WndCardAttrPreview",
    "WndTipEquip",
];
var srcFiles = fileNames.map(fileName => `${srcFile}${fileName}.ts`);

// srcFiles = "./src/**/*";
// targetDir = "./dest/";
// srcBase = "./src/"