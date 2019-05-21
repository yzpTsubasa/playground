<?php

namespace app\api\model;

class Theme extends BaseModel
{
    public function topicImg() {
        return $this->hasOne('Image', 'id', 'topic_img_id');
    }

    public function headImg() {
        return $this->hasOne('Image', 'id', 'head_img_id');
    }

    public function product() {
        return $this->hasMany('Product', 'theme_id', 'id');
    }
}
