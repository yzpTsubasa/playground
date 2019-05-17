<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/11
 * Time: 16:58
 */

namespace app\api\model;


use think\Db;
use think\db\Query;
use think\Exception;
use think\Model;

class Banner extends Model
{
    protected $hidden = ['delete_time', 'update_time'];

    // 关联， 1 对 n
    public function items() {
        return $this->hasMany('BannerItem', 'banner_id', 'id');
    }


    public static function getBannerByID($id) {
        $banner = self::get($id, ['items', 'items.img']);
//        if ($banner) {
//            $banner = $banner->toArray();
//            unset($banner['delete_time']);
//            unset($banner['update_time']);
//        }
//        $banner->hidden(['delete_time', 'update_time']);
//        $banner->visible(['name', 'id']);

        return $banner;

//        // 测试 异常
// //        try {
// //            1/0;
// //        }catch (Exception $exception) {
// //            throw $exception;
// //        }
//
//        // 根据bannerID获取Banner信息
//
//        // 1.SQL语句
//        $result = Db::query('select * from banner_item where banner_id=?', [$id]); //  and img_id=?
//        // 2.构造器
//        $result = Db::table("banner_item")
// //            ->where("banner_id", "=", $id)
// //            ->where("banner_id", $id)
//                ->where(function(Query $query) use ($id){
//                    $query->where('banner_id', '=', $id);
//                })
//                // ->fetchSql()
//                ->select();
//        // 3.模型和关联模型 ORM(Object Relational Mapping)
//
//        // throw new Exception("Test");
//        return $result;
    }
}