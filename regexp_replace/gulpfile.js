const gulp = require("gulp");
const replace = require('gulp-replace');
const bom = require('gulp-bom');


gulp.task("rename_wnd_id", function(){
    return gulp.src(srcFile, {
            base: srcBase
        })
        .pipe(replace(/WND_ID\.([a-zA-Z0-9_]+)/g, function(match, p1, offset, string) {
            var id = wndCls2ID[p1];
            if (id) {
                return `WND_ID.${id}`;
            } else {
                return match;
            }
        }))
        // .pipe(bom())
        .pipe(gulp.dest(targetDir));
});

var srcFile = "E:/projects/DLDL_SVN/src/**/*.ts";
var srcBase = "E:/projects/DLDL_SVN/src/";
var targetDir = "E:/projects/DLDL_SVN/src/";

var wndID2Cls = {
    WND_UI_BOTTOM: "WndUIBottom",
    WND_APP_SHARE: "WndAppShare",
    WND_LEV_UP: "WndLevUp",
    WND_LEV_GET: "WndLevGet",
    WND_LEV_GET_BLACK: "WndLevGetBlack",
    WND_GM_POS_OPEN: "WndGMPosOpen",
    WND_BOOK_UP: "WndHandbookUp",
    WND_RADIO: "WndRadio",
    WND_FATE_NEW: "WndFateNew",
    WND_RECONNECT_CONFIRM: "CWndNetCheck",
    WND_ROLE_ATTR: "WndRoleAttr",
    WND_CARD_ATTR: "WndCardAttr",
    WND_ROLE_INFO: "WndRoleInfo",
    WND_PET_INFO: "WndPetInfo",
    WND_PM: "WndPM",
    SHARE_TIPS: "WndShareTips",
    WND_GUIDE: "WndGuide",
    WND_GUIDEX: "WndGuidEx",
    WND_WEAK_GUIDE: "WndWeakGuide",
    WND_START_SHOW: "WndGameStartShow",
    FST_ENTER_GAME: "WndFstEnterGame",
    WND_EXT_VIP: "WndExtVip",
    WND_SVR_CTIPS: "WndSvrConnectTips",
    WND_CHOICE_SERVERIP: "WndChoiceServerIp",
    WND_CHOICE_SERVER: "WndChoiceServer",
    WND_CONFIRM: "WndConfirm",
    WND_LOGIN: "WndLogin",
    WND_APPSDK_LOGIN_BG: "WndAppSDKLoginBG",
    WND_LOADING: "WndLoading",
    WND_GOGOGO: "WndLoading",
    WND_NAME: "WndName",
    WND_BATTLE_INFO: "WndBattleInfo",
    WND_BATTLE_RAGE: "WndBattleRage",
    WND_BATTLE: "WndBattle",
    WND_CONVERT: "WndConvert",
    WND_WB_BUY_NUM: "WndWBBuyNum",
    WND_TASK_RESET: "WndTaskReset",
    WND_VIP_DETAIL: "WndVipDetail",
    WND_VIP_PRIVILEGE_DETAIL: "WndVipPrivilegeDetail",
    WND_SHARE_GIFT: "WndShareGift",
    WND_SHARE_ACH: "WndShareAch",
    WND_SHARE_ACH_TIPS: "WndShareAchTips",
    WND_BATTLE_TOP: "WndBattleTop",
    WND_BATTLE_TOP_FULL: "WndBattleTopFull",
    WND_EMONEY_TO_MONEY: "WndEMoney2Money",
    WND_GOD_CALL_TIPS: "WndGodCallTips",
    WND_GET_PET: "WndGetPet",
    WND_MAIL_DETAIL: "WndMailDetail",
    WND_MAIL: "WndMail",
    WND_FAST_FIGHT: "WndFastFight",
    WND_BATTLE_COM: "WndBattleCom",
    WND_BATTLE_CHAT: "WndBattleChat",
    WND_BATTLE_ACT: "WndBattleAct",
    WND_TASK_PRG_SHOW: "WndTaskPrgShow",
    WND_TM_PRG: "WndTMPrg",
    WND_SER_OPEN_BOSS: "WndSerOpenBoss",
    WND_FAMILY_ACT: "WndFamilyAct",
    WND_ACT_MAP_INFO: "WndActMapInfo",
    WND_MAP_DETAIL: "WndMapDetail",
    WND_WORLD_MAP: "WndWorldMap",
    WND_WORLD_MAP_TRANSITION: "WndWorldMapTransition",
    WND_VIP_WELFARE: "WndVipWelfare",
    WND_CATCH_MON: "WndCatchMon",
    WND_CATCH_GHO: "WndCatchGho",
    WND_CIRCLE_BOSS_ACT: "WndCircleBossAct",
    WND_CIRCLE_BOSS_AWARD: "WndCircleBossAward",
    WND_BTLRECORD: "WndBtlRecord",
    WND_SERVERWAR_READY: "WndServerWarReady",
    WND_SERVERWAR_RANK: "WndServerWarRank",
    WND_SERVERWAR_REWARD: "WndServerWarReward",
    WND_SERVERWAR: "WndServerWar",
    WND_SERVER_BTL_MAIN: "WndServerBtlMain",
    WND_ACTIVITY: "WndActivity",
    WND_MAIN_CITY: "WndMainCity",
    WND_BLACK: "WndBlack",
    WND_BAG: "WndBag",
    WND_BOX_4IN1: "WndBox4In1",
    WND_TIP_ITEM: "WndTipItem",
    WND_ITEM_BATCH_USE: "WndItemBatchUse",
    WND_TIP_EQUIP: "WndTipEquip",
    WND_TIP_SKILL: "WndTipSkill",
    WND_TIP_CODE: "WndSplGiftShow",
    WND_TIP_ITEM_EX: "WndTipItemEx",
    WND_GMSL_TIP: "WndGMSLTip",
    WND_DIC_EVENT: "WndDicEvent",
    WND_DICE: "WndDice",
    WND_DICEX: "WndDicex",
    WND_EGG_RANK: "WndEggRank",
    WND_EGG: "WndEgg",
    WND_SHOP_FASHION: "WndShopFashion",
    WND_SHOP: "WndShop",
    WND_SHOP_NEW: "WndShopAllNew",
    WND_LUCKY_LOTTERY: "WndLuckyLottery",
    WND_EIGHT_DAY_ADD_TOTAL: "WndEightDayAddTotal",
    WND_EIGHT_DAY_COPY: "WndEightDayCopy",
    WND_EIGHT_DAY_COPY_TBL: "WndEightDayCopyTbl",
    WND_EIGHT_DAY_COPY_RANK: "WndEightDayCopyRank",
    WND_EIGHT_DAY_ACT_RANK: "WndEightActRank",
    WND_QUIZE: "WndQuize",
    WND_LOTTERY_EX: "WndLotteryEx",
    WND_SOLDIER_FE: "WndSoldierFe",
    WND_DAILY_RECHARGE: "WndDailyRecharge",
    WND_MIX_MAIN: "WndMixMain",
    WND_MIX_Add: "WndMixAdd",
    WND_MIX_INVEST: "WndMixInvest",
    WND_MIX_LOGIN: "WndMixLogin",
    WND_MIX_RANK: "WndMixRank",
    WND_MIX_GIFT: "WndMixGift",
    WND_MIX_RING: "WndMixRing",
    WND_MIX_UP: "WndMixUp",
    WND_MIX_BOSS: "WndMixBoss",
    WND_MIX_CONV: "WndMixConv",
    WND_MIX_PVP: "WndMixPvp",
    WND_AUCTION_GET: "WndAuctionGet",
    WND_AUCTION: "WndAuction",
    WND_AUCTION_LOG: "WndAuctionLog",
    WND_AUCTION_SELL: "WndAuctionSell",
    WND_AUCTION_SHOW: "WndAuctionShow",
    WND_PRAY_FACE_DET: "WndPrayFaceDetail",
    WND_PRAY_BASE: "WndPrayBase",
    WND_PRAY_MAIN: "WndPrayMain",
    WND_PRAY_FACE: "WndPrayFace",
    WND_SUIT: "WndSuit",
    WND_BUY: "WndBuy",
    WND_OFFLINE_INFO: "WndOfflineInfo",
    WND_GETMATERIAL: "WndGetMaterial",
    WND_EQUIP_STAR: "WndEquipStar",
    WND_EQUIP: "WndEquipMain",
    WND_EQUIP_SMELT: "Wnd_Equip_Smelt",
    WND_EQUIP_SMELT_ADD: "Wnd_Equip_Smelt_Add",
    WND_ARENA_MAIN: "WndArenaMain",
    WND_EXP_BOSS: "WndExpBoss",
    WND_FML_BOSS: "WndFmlBossFight",
    WND_BOSS_FIGHT: "Wnd_boss_fight",
    WND_BOSS_FIGHTAWARD: "Wnd_boss_fightAward",
    WND_BOSS_RANK: "Wnd_boss_rank",
    WND_BOSS_APPEAR: "Wnd_boss_Appear",
    WND_BOSS_APPEARC: "Wnd_boss_AppearC",
    WND_BOSS_ROUND: "WndBossRound",
    WND_EQUIP_MASTER: "WndEquipMaster",
    WND_NAV_MGR: "WndNavMgr",
    WND_NAV_MGR_FAMILY: "WndNavMgr",
    WND_NAV_NEW_MGR: "WndNavNewMgr",
    WND_FASHION_USE: "WndFashionUse",
    WND_FASHION_PRE: "WndFashionPreview",
    WND_HANDBOOK_ATTR: "WndHandbookAttr",
    WND_HANDBOOK_SPLIT: "WndHandbookSplit",
    WND_HANDBOOK_DETAIL: "WndHandbookDetail",
    WND_HANDBOOK_BASE: "WndHandbookBase",
    WND_HANDBOOK_MAIN: "WndHandbookMain",
    WND_HANDBOOK_SHOW: "WndHandbookShow",
    WND_HEAD: "WndHead",
    WND_HEAD_RING: "WndHeadRing",
    WND_ROLE_HERO_TBL: "WndRoleHeroTbl",
    WND_ROLE_SKILL_TBL: "WndRoleSkillTbl",
    WND_ROLE_WING_TBL: "WndRoleWingTbl",
    WND_ROLE_SKILL_SETTING: "WndRoleSkillSetting",
    WND_ARENA_RANK: "WndArenaRank",
    WND_ROLE_RANK_UP: "WndRoleRankUp",
    WND_REQ_HELP: "WndReqHelp",
    WND_RESULT: "WndArenaRes",
    WND_RESULT_MINE: "WndArenaResMine",
    WND_SWAP_SETTLE: "WndSwapSettle",
    WND_BAG_B: "Wnd_bag_B",
    WND_SPECIAL_MAP: "WndSpecialMap",
    WND_ACTIVITY_MAP: "WndActivityMap",
    WND_OPENPACKAGE: "WndOpenPackage",
    WND_COPY_TEAM_DETAIL: "WndCopyTeamDetail",
    WND_COPY_TEAM_PRE: "WndCopyTeamPre",
    WND_COPY_TEAM: "WndCopyTeam",
    WND_SUP_BOX: "WndSupBox",
    WND_SUP_F_CON: "WndSupFCon",
    WND_SUP_F_ASK: "WndSupFAsk",
    WND_SUP_RECORE: "WndSupRecord",
    WND_SUP_FIGHT: "WndSupFight",
    WND_SUP_COPY: "WndSupCopy",
    WND_YEAR_BOSS_DET: "WndYearBossDet",
    WND_YEAR_BOSS_ASK: "WndYearBossAsk",
    WND_YEAR_BOSS: "WndYearBoss",
    WND_YEAR_BUY: "WndYearBuy",
    WND_CAT: "WndCat",
    WND_COMTEAMM: "WndComTeamM",
    WND_WORLD_TEAM: "WndWorldTeam",
    WND_WORLDBOSS_HURTRANK: "Wnd_bossHurt_rank",
    WND_PET_ELE_RESET: "WndPetEleReset",
    WND_PET_TBL: "WndPetTbl",
    WND_MER_FETTER_TBL: "WndMerFetterTbl",
    WND_MER_ATTR_ADD_TBL: "WndMerAttrAddTbl",
    WND_RULE: "WndRule",
    WND_RULE_GM: "WndRuleGM",
    WND_BOSS_REMIND: "WndBossRemind",
    WND_BOSS_RECORD: "WndBossRecord",
    WND_TIP_ROLE_EQUIPED: "WndTipRoleEquiped",
    WND_TIP_BOSS: "WndTipBoss",
    WND_SWEEP_CONFIRM: "WndSweepConfirm",
    WND_AUCTION_CAN_SELL_CONFIRM: "WndAuctionCanSellConfirm",
    WND_OPENNEW: "WndOpennew",
    WND_ROLE_WING_ATTR_ADD: "WndRoleWingAttrAdd",
    WND_TIP_SKILL_WING: "WndTipSkillWing",
    WND_TIP_BEAD: "WndTipBead",
    WND_TIP_EQUIP_OTHER: "WndTipEquipOther",
    WND_TIP_REDEQP: "WndTipRedEqp",
    WND_GEQP_GET: "WndGEqpGet",
    WND_SPEC_MTL_GET: "WndSpecMtlGet",
    WND_AD_SHOW: "WndADShow",
    WND_WX_COLLECT: "WndWXCollect",
    WND_GIFT_SHOW: "WndGiftShow",
    WND_TIP_GET: "WndGetTip",
    WND_HANDBOOK_GET: "WndHandbookGet",
    WND_PRAY_FACE_UP: "WndPrayFaceUp",
    WND_GUIDE_TEAM: "WndGuideTeam",
    WND_GUIDE_AWARD: "WndGuideAward",
    WND_GUIDE_EQUIP: "WndGuideEquip",
    WND_GUIDE_LEV: "WndGuideLev",
    WND_GUIDE_LAST: "WndGuideLast",
    WND_LOVE_SHOP: "WndLoveShop",
    WND_TREASURE_SHOP: "WndTreasureShop",
    WND_GET_EXP: "WndGetExp",
    WND_ACT_SIGN: "WndActSign",
    WND_LEV_GIFT: "WndLevGift",
    WND_MONTH_CARD: "WndMonthCard",
    WND_PUBLIC_NOTICE: "WndPublicNotice",
    WND_PUBLIC_NOTICE_PRE: "WndPublicNoticePre",
    WND_ACT_CODE: "WndActCode",
    WND_WELFARE_HALL: "WndWelfareHall",
    WND_ADD_THREE: "WndAddThree",
    WND_SEVEN_ADD: "WndSevenAdd",
    WND_CONTINUOUS_TREE: "WndActContinuousThree",
    WND_GM_CALL_DIS: "WndGmCallDis",
    WND_GET_ORP_CHIP: "WndGetOrgChip",
    WND_EQUIP_COPY: "WndEquipCopy",
    WND_ORG_SHOP: "WndOrgShop",
    WND_RING_TASK: "WndRingTask",
    WND_ACTIVE_SYS: "WndActiveSys",
    WND_ACTIVE_SYS_GIFT: "WndActiveSysGift",
    WND_ACTIVE_SYS_BACK: "WndActiveSysBack",
    WND_FREEBUY: "WndFreeBuy",
    WND_FAMILY_CALL: "WndFamilyCall",
    WND_FAMILY_CONV: "WndFamilyConv",
    WND_FAMILY_SHOP: "WndFamilyShop",
    WND_FAMILY_MAIN: "WndFamilyMain",
    WND_FAMILY_BUILD: "WndFamilyBuild",
    WND_FAMILY_SKILL: "WndFamilySkill",
    WND_FAMILY_DEFAULT: "WndFamilyDef",
    WND_FAMILY_EXP: "WndFamilyExp",
    WND_FAMILY_CREATE: "WndFamilyCreate",
    WND_FAMILY_ADD: "WndFamilyAdd",
    WND_FAMILY_ANNO: "WndFamilyAnno",
    WND_CHANGE_NAME: "WndChangeName",
    WND_FAMILY_MEM: "WndFamilyMem",
    WND_FAMILY_MEM_OP: "WndFamilyMemOp",
    WND_FAMILY_JOB: "WndFamilyJob",
    WND_FAMILY_EXCHANGE: "WndFamilyExchange",
    WND_FAMILY_SET: "WndFamilySet",
    WND_FAMILY_RANK: "WndFamilyRank",
    WND_EMOJI: "WndEmoji",
    WND_CHATSAMPLE: "WndChatSample",
    WND_BATTLE_ELE: "WndBattleEle",
    WND_WORLDBOSS_HP: "Wnd_world_boss_hp",
    WND_PVP_EVENT: "CWndPVPEvent",
    WND_PET_TALENT_MAIN: "WndTalentMain",
    WND_PET_CHALLENGE: "WndPetChallenge",
    WND_PET_CHALLENGE_POINT: "WndPetChallengePoint",
    WND_PET_POS: "WndPetBattlePos",
    WND_TIP_FAKE: "WndTipFake",
    WND_GAME_SETTING: "WndGameSetting",
    WND_FACE: "WndFace",
    WND_GM_POS: "WndGMBattlePos",
    WND_GM_POS_EX: "WndGMPosEx",
    WND_NEW_MODEL: "WndNewModel",
    WND_CHARGE_ITEM: "WndChargeItem",
    WND_CHARGE_FLASH: "WndChargeFlash",
    WND_CHARGE_DAILY: "WndChargeDaily",
    WND_MOUNT_SKIN: "WndMountSkin",
    WND_MOUNT_PRE: "WndMountPreview",
    WND_RANK_TOTAL: "WndRankTotal",
    WND_RECHARGE_ED: "WndRechargeEightDay",
    WND_FUND_INVEST: "WndFundInvest",
    WND_FUND_INVEST2: "WndFundInvest2",
    WND_FUND_MAIN: "WndFundMain",
    WND_FUND_LEV: "WndFundLev",
    WND_FUND_RANK: "WndFundRank",
    WND_FUND_RANK2: "WndFundRank2",
    WND_YEAR_INVEST: "WndYearInvest",
    WND_USER_INFO: "WndUserInfo",
    WND_RENAME: "WndRename",
    WND_LOTTERY_BOX: "WndLotteryBox",
    WND_WELFARE_LOTTERY: "WndWelfareLottery",
    WND_ROLE_DRUG: "WndRoleDrug",
    WND_ROLE_HDRUG: "WndHDrug",
    WND_TIP_DRUG: "WndTipDrug",
    WND_RECHARGE_ONE: "WndRechargeOne",
    WND_SKILL_MAIN: "WndSkillMain",
    WND_HEART_SKILL: "WndHeartSkill",
    WND_SKILL_STAR: "WndSkillStar",
    WND_TIP_HEART_SKILL: "WndTipHeartSkill",
    WND_FAMILY_ACTIVE_MER: "WndWelMerActive",
    WND_FAMILY_ACTIVE_RANK: "WndActiveRank",
    WND_FAMILY_BATTLE_REWARD: "WndFamilyBattleReward",
    WND_FAMILY_BATTLE: "WndFamilyBattle",
    WND_FAMILY_BATTLE_PVE: "WndFamilyBattlePve",
    WND_FAMILY_BATTLE_PVP: "WndFamilyBattlePvp",
    WND_FAMILY_BATTLE_DOOR: "WndFamilyBattleDoor",
    WND_FAMILY_BATTLE_RANK: "WndFamilyBattleRank",
    WND_FAMILY_BATTLE_TEAM_SHOW: "WndFamilyBattleTeamShow",
    WND_FAMILY_BATTLE_TEAM_JOIN: "WndFamilyBattleTeamJoin",
    WND_FAMILY_BATTLE_RULE: "WndFamilyBattleRule",
    WND_FAMILY_GUIDE: "WndFamilyGuide",
    WND_GUESS: "WndGuess",
    WND_GUESS_BET: "WndGuessBet",
    WND_GUESS_INFO: "WndGuessInfo",
    WND_GUESS_POINT: "WndGuessPoint",
    WND_GUESS_LOG: "WndGuessLog",
    WND_BUDDY_INFO: "WndBuddyInfo",
    WND_USER_OTHER: "WndUserOther",
    WND_PRI_CHAT: "WndPriChat",
    WND_PET_VARIATE: "WndPetVariate",
    WND_FORGE_SELECT: "WndForgeSelect",
    WND_COMPOSE: "WndCompose",
    WND_COMPOSE_TBL: "WndComposeTbl",
    WND_COMPOSE_RE_TBL: "WndComposeRETbl",
    WND_GM_COMPOSE_ADD: "WndGMComposeAdd",
    WND_GM_COMPOSE_RECAST: "WndGMComposeRecast",
    WND_GM_COMPOSE_MAIN: "WndGMComposeMain",
    WND_BEGINNER_PKG: "WndBeginnerPkg",
    WND_IDLE_TIP: "WndIdleTip",
    WND_VIP_REMINDER: "WndVipReminder",
    WND_SURPRISE_GIFT: "WndSurpriseGift",
    WND_ROULETTE: "WndRoulette",
    WND_ROULETTE_RANK: "WndRouletteRank",
    WND_RGOT_TEN: "WndRGotTen",
    WND_ED_BOSS: "WndEDBoss",
    WND_WEEK_CARD: "WndWeekCard",
    WND_RELATION: "WndRelation",
    WND_MP_MAIN: "WndMPMain",
    WND_MP_TUTOR: "WndMPTutor",
    WND_MP_PUPIL: "WndMPPupil",
    WND_TUTOR_APPLYS: "WndTutorApplys",
    WND_MP_EXP_PRG: "WndMPExpPrg",
    WND_RE_DETAIL: "WndREDetail",
    WND_RE_SEND: "WndRESend",
    WND_RE_MINI: "WndREMini",
    WND_FB_MAIN: "WndFBMain",
    WND_VIP_LIFELONG: "WndVipLifelong",
    WND_GIFT_DAILY: "WndGiftDaily",
    WND_EXP_RETURN: "WndExpReturn",
    WND_EXP_RETURN_CONFIRM: "WndExpReturnConfirm",
    WND_PET_CARD: "WndPetCard",
    WND_MP_RECORDS: "WndTutorRecords",
    WND_WEEK_SERVERWAR: "WndWeekServerWar",
    WND_WEEK_SERVERWAR_RANK: "WndWeekServerRank",
    WND_WEEK_SERVERWAR_REWARD: "WndWeekServerReward",
    WND_WEEK_LOGS: "WndWeekKFZEvent",
    WND_WEEK_LUCK: "WndWeekLuck",
    WND_MY_FB_INFO: "WndMyFBInfo",
    WND_MY_FBHP_INFO: "WndMyFBHPInfo",
    WND_GEQP_ATTR: "WndGEqpAttr",
    WND_GEQP_ATTR_OP: "WndGuardEqpAttrOp",
    WND_TIP_GEQP_EX: "WndTipGuardEqpEx",
    WND_TIP_GEQP: "WndTipGuardEqp",
    WND_GEQP_MAKE_BASE: "WndGEqpMakeBase",
    WND_GEQP_UP: "WndGEqpUp",
    WND_GEQP_CLEAR: "WndGEqpClear",
    WND_GEQP_SWALLOW: "WndGEqpSwallow",
    WND_GEQP_STAR: "WndGEqpStar",
    WND_GEQP_STAR2: "WndGEqpStar2",
    WND_GEQP_MAKE: "WndGEqpMake",
    WND_GEQP_CHIP_MAKE: "WndGEqpChipMake",
    WND_GEQP_CHIP_MAKE2: "WndGEqpChipMake2",
    WND_GCOMPOSE: "WndGComposeMain",
    WND_GEQP_MAIN: "WndGuardEqpMain",
    WND_ROLE_PROTECT_MAIN: "WndRoleProtectedMain",
    WND_GEQP_CHIP: "WndGuardEqpChip",
    WND_GEQP_SMELT: "WndGEqpSmelt",
    WND_RMD_PUPILS: "WndRmdPupils",
    WND_TIP_SKILL_TALENT: "WndTipSkillTalent",
    WND_TIP_ITEM_SKILL: "WndTipItemSkill",
    WND_PET_SHOW_OFF: "WndPetShowOff",
    WND_HBY_OPEN: "WndOpenHb",
    WND_TIPS_VIP_UP: "WndTipsVipUp",
    WNN_HBDL_OPEN: "WndOpenHbdl",
    WND_HONGBAO_KAI: "WndHBK",
    WND_HONG_BAO: "WndHBDL",
    WND_HBY: "WndHBY",
    WND_HBY_OPEN: "WndOpenHb",
    WND_VIPSEVEN: "WndZxVipSeven",
    WND_VIPEIGHT: "WndZxVipEight",
    WND_PRE_GOD_BEAST: "WndPreGodBeast",
    WND_RECHARGE_FOUR_TIMES: "WndRechargeFourTimes",
    WND_WELFAREGANG: "WndWelfareGang",
    WND_JADE_PAVILION: "WndJadePavilion",
    WND_EQUIP_FORGE: "WndEquipForge",
    WND_EQUIP_ENHENCE: "Wnd_EquipEnhence",
    WND_EQUIP_FORGE_MAIN: "WndEquipForgeMain",
    WND_EQUIP_ENHENCE_MAIN: "WndEquipEnhenceMain",
    WND_TIP_EQUIP_FORGE: "WndTipEquipForge",
    WND_COPY_TEAM_EQUIP_DETAIL: "WndCopyTeamEquipDetail",
    WND_COPY_TEAM_EQUIP_PRE: "WndCopyTeamEquipPre",
    WND_COPY_TEAM_EQUIP: "WndCopyTeamEquip",
    WND_RANK_PLAYER_DETAIL: "WndRankPlayerDetail",
    WND_RANK_PLAYER_COMPARE: "WndRankPlayerCompare",
    WND_RANK_PLAYER_ATTR: "WndRankPlayerAttr",
    WND_TIP_RANK_RED_EQP: "WndTipRankRedEqp",
    WND_FATE_MAIN: "WndFateMain",
    WND_FATE_SHOP: "WndFateShop",
    WND_FATE_LOTTERY: "WndFateLottery",
    WND_FATE_COPY: "WndFateCopy",
    WND_FATE_SMELT: "WndFateSmelt",
    WND_FATE_COPY_ATTR: "WndFateCopyAttr",
    WND_FATE_COPY_RANK: "WndFateCopyRank",
    WND_FATE_ACH: "WndFateAch",
    WND_PET_STAR_TBL: "WndPetStarTbl",
    WND_TRAIN_CARD_DRUG: "WndTrainCardDrug",
    WND_TRAIN_CARD_ACTIVATE: "WndTrainCardActivate",
    WND_ACTIVATION_CARD: "WndActivationCard",
    WND_AREA_BOSS_DETAIL: "WndAreaBossDetail",
    WND_BOSS_FIGHT_MAIN: "WndBossFightMain",
    WND_BOSS_FIGHT2: "WndBossFight",
    WND_TIP_DIG: "WndTipDig",
    WND_RANK_ACH: "WndRankAch",
    WND_RANK_GIFT: "WndRankGift",
    WND_DESTINY_MAIN: "WndDestinyMain",
    WND_DESTINY_APOCALYPSE: "WndDestinyApocalypse",
    WND_DESTINY_POKEDEX: "WndDestinyPokedex",
    WND_DESTINY_DETAIL: "WndDestinyDetail",
    WND_TIP_DESTINY: "WndTipDestiny",
    WND_DESTINY_APOCALYPSE_POKEDEX: "WndDestinyApocalypsePokedex",
    WND_TIP_APOCALYPSE_SKILL: "WndTipApocalypseSkill",
    WND_GOD_MER_MAIN: "WndGodMerMain",
    WND_GM_UP: "WndGMUp",
    WND_GM_STAR: "WndGMStar",
    WND_GM_STAR_UP: "WndGMStarUp",
    WND_STAR_UNENOUGH_TIP: "WndStarUnenoughTip",
    WND_GM_RECRUIT: "WndGMRecruit",
    WND_GM_RECRUIT_SHOW: "WndGMRecruitShow",
    WND_GM_HANDBOOK: "WndGMHandbook",
    WND_GM_CALL_MATE: "WndGMCallMate1",
    WND_GM_CALL_GOD_MER: "WndGMCallMate2",
    WND_PET_CALL: "WndGMCall",
    WND_ACTIVATION_CARD_DECOMPOSE: "WndActivationCardDecompose",
    WND_GM_SKILL: "WndGMSkill",
    WND_GMS_LEARN: "WndGMSLearn",
    WND_GMS_TIP: "WndGMSTip",
    WND_GM_EQUIP: "WndGMEquip",
    WND_GME_TIP: "WndGMETip",
    WND_GME_SPLIT: "WndGMESplit",
    WND_GME_BAG: "WndGMEBag",
    WND_GME_UP: "WndGMEUp",
    WND_CARD_ATTR_PREVIEW: "WndCardAttrPreview",
    WND_GMES_ON: "WndGMESon",
    WND_GMES_TIP: "WndGMESTip",
    WND_GMES_TIP_GET: "WndGMESTipGet",
    WND_GMSE_BAG: "WndGMSEBag",
    WND_GMSE_SHOP: "WndGMSEShop",
    WND_GMSE_TIP: "WndGMSETip",
    WND_GMSE_TIP_SLIM: "WndGMSETipSlim",
    WND_GMSE_UP: "WndGMSEUp",
    WND_GM_COPY: "WndGMCopy",
    WND_GMC_FIGHT: "WndGMCFight",
    WND_GMC_ASK: "WndGMCAsk",
    WND_GMC_CON: "WndGMCCon",
    WND_GMC_CARD: "WndGMCCard",
    WND_GM_ACH: "WndGMAch",
    WND_PET_BTL_POS_GIFT: "WndPetBtlActGift",
    WND_TREASURE_AWARD: "WndTreasureAward",
    WND_ACH_ACT_GET: "WndAchActGet",
    WND_CHAPTER_TASK: "WndChapterTask",
    WND_XLQY_AWARD: "WndXlqyAward",
    WND_DART_MAIN: "WndDartMain",
    WND_DART_SELECT: "WndDartSelect",
    WND_DART_ROB: "WndDartRob",
    WND_DART_LOG: "WndDartLog",
    WND_CERTIFICATION: "WndCertification",
    WND_SHARE_MENU: "WndShareMenu",
    WND_GUIDE2: "WndGuide2",
    WND_PET_CATCH_AWARD: "WndPetCatchAward",
    WND_CBUY_NUM: "WndCBuyNum",
    WND_PET_BTL_POS_ACT: "WndPetBtlPosAct",
    WND_COPY_TEAM_SENIOR: "WndCopyTeamSenior",
    WND_DART_CONFIRM: "WndDartConfirm",
    WND_SENIOR_TEAM_SHOP: "WndSeniorTeamShop",
    WND_COPY_SENDAI: "Wnd_CopySendai",
    WND_NEW_JEWEL_MAIN: "WndNewJewelMain",
    WND_NEW_JEWEL_EQUIP: "WndNewJewelEquip",
    WND_NEW_JEWEL_COMPOSE: "WndNewJewelCompose",
    WND_NEW_JEWEL_COMPOSE2: "WndNewJewelCompose2",
    WND_NEW_JEWEL_SELECT: "WndNewJewelSelect",
    WND_NEW_JEWEL_FORGE: "WndNewJewelForge",
    WND_NEW_JEWEL_BUY: "WndNewJewelBuy",
    WND_NEW_JEWEL_AWARD: "WndNewJewelAward",
    WND_NEW_JEWEL_POS_ACT: "WndNewJewelPosAct",
    WND_TIP_NJ_COMPOSE2: "WndTipNJCompose2",
    WND_MIX_FES_TOTAL: "WndMixFesTotal",
    WND_MIX_FIRST_ADD_TOTAL: "WndMixFirstAddTotal",
    WND_MIX_COST_RANK: "WndMixCostRank",
    WND_SDK_VIP_GIFT: "WndSdkVipGift",
    WND_SDK_GIFT_SHOW: "WndSdkGiftShow",
    WND_NRE_ROULETTE: "WndNRERoulette",
    WND_NRE: "WndNRE",
    WND_NRE_STONE: "WndNREStone",
    WND_NRE_SMELT: "WndNRESmelt",
    WND_MARRIAGE_FEAST: "WndMarriageFeast",
    WND_MARRIAGE_MATE: "WndMarriageMate",
    WND_MARRIAGE_EXP_PRG: "WndMarriageExpPrg",
    WND_MARRIAGE_APPLYS: "WndMarriageApplys",
    WND_WEDDING_RING: "WndWeddingRing",
    WND_MARRIAGE_COPY: "WndCopyMarriage",
    WND_MARRIAGE_COPY_DETAIL: "WndCopyMarriageDetail",
    WND_XSDB: "WndXsdb",
    WND_QMDB: "WndQmdb",
    WND_EFF_SHOW: "WndEffShow",
    WND_CBUY_TIP: "WndCBuyTip",
    WND_PET_SKILL_WASH: "WndPetSkillWash",
    WND_PET_SKILL_LOCK: "WndPetSkillLock",
    WND_FATE_RES: "WndFateResonance",
    WND_FATE_DEV: "WndFateDev",
    WND_SOUL: "WndSoul",
    WND_SOUL_ATTR: "WndSoulAttr",
    WND_SOUL_LOCK: "WndSoulLock",
    WND_ACH_ACT: "WndAchAct",
    WND_ACH_ACT_DETAIL: "WndAchActDetail",
    WND_PET_POINT_MAIN: "WndPetPointMain",
    WND_PET_POINTSKILL: "WndPetPointSkill",
    WND_PET_SKILL_HANDBOOK: "WndPetSkillHandbook",
    WND_PET_POINTQUALITY: "WndPetPointQuality",
    WND_PET_POINTEVOLUTION: "WndPetPointEvolution",
    WND_PET_POINTSTAR: "WndPetPointStar",
    WND_PET_POINTTALENT: "WndPetPointTalent",
    WND_PET_POINTEQUIP: "WndPetPointEquip",
    WND_MER_POINTSKILL: "WndMerPointSkill",
    WND_MER_POINTQUALITY: "WndMerPointQuality",
    WND_MER_POINTSTAR: "WndMerPointStar",
    WND_MER_POINTEQUIP: "WndMerPointEquip",
    WND_GM_POINT_RANK_MAIN: "WndGmPointRankMain",
    WND_CARD_POINT_RANK: "WndCardPointRank",
    WND_CARD_POINT_CS_RANK: "WndCardPointCSRank",
    WND_CARD_POINT_CS_RANK_SHOW: "WndCardPointCSRankShow",
    WND_ACT_ADD_TOTAL: "WndActAddTotal",
    WND_TREASURE_MAP: "WndTreasureMap",
    WND_WELFARE_LUCKY: "WndWelfareLucky",
    WND_TM_BUY: "WndTMBuy",
    WND_TM_COMPOSE: "WndTMCompose",
    WND_TM_GET: "WndTMGet",
    WND_ACH_CHAPTER: "WndAchChapter",
    WND_ACH_CHAPTER_ATTR: "WndAchChapterAttr",
    WND_GM_CALL_BASE: "WndGMHBCallBase",
    WND_GM_BOOK_MAIN: "WndGMHBMain",
    WND_GA_BOOK_TB: "WndGAHBTbl",
    WND_WORKER_NAV: "WndWorkerNav",
    WND_WORKER_INFO: "WndWorkerInfo",
    WND_WORKER_INFO1: "WndWorkerInfo1",
    WND_WORKER_INFO2: "WndWorkerInfo2",
    WND_WORKER_INFO3: "WndWorkerInfo3",
    WND_WORKER_LEVELUP: "WndWorkerLevelUp",
    WND_WORKER_TEAM: "WndWorkerTeam",
    WND_WORKER_CITY: "WndWorkerCity",
    WND_WORKER_POS: "WndWorkerPos",
    WND_WORKER_BUY: "WndWorkerBuy",
    WND_DOCK: "WndDock",
    WND_DOCK_BACK: "WndDockBack",
    WND_DOCK_CHANGE: "WndDockChange",
    WND_DOCK_BUY: "WndDockBuy",
    WND_MINING: "WndMining",
    WND_MINING_ROB: "WndMiningRob",
    WND_MINE_LOG: "WndMineLog",
    WND_ATTR_DEV: "WndAttrDev",
    WND_ATTR_DEV_TIPS: "WndAttrDevTips",
    WND_XYX_SHARE: "WndXYXShare",
    WND_FIRST_SHARE: "WndFirstShare",
    WND_XSHARE1: "WndXShare1",
    WND_XSHARE2: "WndXShare2",
    WND_XSHARE3: "WndXShare3",
    WND_XSHARE4: "WndXShare4",
    WND_SHARE_PRE: "WndSharePre",
    WND_WX_RECONNECT_CONFIRM: "WndWXReconnect",
    WND_GOLRY_PK: "WndGloryPk",
    WND_GOLRY_POS: "WndGloryPos",
    WND_GOLRY_RANK: "WndGloryRank",
    WND_PK_GOLRY_BASE: "WndPkGloryBase",
    WND_PRVILEGE: "WndPrivilege",
    WND_PRVILEGE_DESC: "WndPrivilegeDesc",
    WND_TREASURE_BOX: "WndTreasureBox",
    WND_TB_FAST_OPEN: "WndTBFastOpen",
    WND_TB_OPEN: "WndTBOpen",
    WND_ACT_ADD: "WndActAdd",
    WND_INVITE_CODE: "WndInviteCode",
    WND_BOSS: "WndBoss",
    WND_NEW_VER_OP: "WndNewVerOp",
    WND_PET_PARK: "Wnd_PetPark",
    WND_DOCK_HANDBOOK: "WndDockHandBook",
    WND_BONE_MAIN: "WndBoneMain",
    WND_BONE_SOUL: "WndBoneSoul",
    WND_AYAKASHI_TBL: "WndAyakashiTbl",
    WND_WSOUL_TBL: "WndWSoulTbl",
    WND_BONE_SOUL_EX: "WndBoneSoulEx",
    WND_BONE_SOUL_EX_UP: "WndBoneSoulExUp",
    WND_BONE_DETAIL: "WndBoneDetail",
    WND_BONE_BOOK: "WndBoneBook",
    WND_BONE_COMPOSE: "WndBoneCompose",
    WND_BONE_BAG: "WndBoneBag",
    WND_BONE_SPLIT: "WndBoneSplit",
    WND_TIP_BONE_SOUL_EX: "WndTipBoneSoulEx",
    WND_INVITER_CONFIRM: "WndInviterConfirm",
    WND_BONE_TIP: "WndBoneTip",
    WND_BONE_COMPARE: "WndBoneCompare",
    WND_CARD_CREATE: "WndCardCreate",
    WND_HOLYBEAST_LOTTERY: "WndHolyBeastLottery",
    WND_GIFT_ITEM_USE: "WndGiftItemUse",
    WND_PET_EXPLORE: "WndPetExplore",
    WND_PET_EXPLORING: "WndPetExploring",
    WND_PET_TO_EXPLORE: "WndPetToExplore",
    WND_PET_EXPLORE_AWARD: "WndPetExploreAward",
    WND_PET_EXPLORE_CHOOSE: "WndPetExploreChoose",
    WND_PET_EXPLORE_POS: "WndPetExplorePos",
    WND_PET_EQUIP: "WndPetEquip",
    WND_PET_EQP_SPLIT: "WndPetEqpSplit",
    WND_PET_EQP_BAG: "WndPetEqpBag",
    WND_PET_EQP_UP: "WndPetEqpUp",
    WND_LIMIT_ACT: "WndLimitAct",
    WND_ORIGINNUAL_PAINTING: "WndOriginalPainting",
    WND_CUMULATIVE_RECHARGE: "WndCumulativeRecharge",
    WND_CUMULATIVE_RANK: "WndCumulativeRank",
    WND_GDISCOUNT_PACKAGE: "WndGDiscountPackage",
    WND_COMPLETE_DAILY_RECHARGE: "WndCompleteDailyRechage",
    WND_LOOP_ACHIEVE_MAIN: "WndLoopAchieveMain",
    WND_LOOP_ACHIEVE_BATTLE_MAP: "WndLoopAchieveBattleMap",
    WND_LOOP_ACHIEVE_SHOP: "WndLoopAchieveShop",
    WND_LOOP_ACHIEVE_LOTTERY: "WndLoopAchieveLottery",
    WND_LOOP_ACHIEVE_RMB_LEV: "WndLoopAchieveRMBLev",
    WND_TIP_GEQP: "WndTipGuardEqp",
    WND_ADD_RMB: "WndAddRmb",
    WND_RECHARGE_FIRST: "WndRechargeFirst",
};
var wndCls2ID = {};
for (var id in wndID2Cls) {
    wndCls2ID[wndID2Cls[id]] = id;
}