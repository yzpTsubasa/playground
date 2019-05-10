<?php

namespace app\api\controller\v1;

class Banner {
    /**
     * 获取指定id的banner数据
     * @url /banner/:id
     * @http GET
     * @param $id 指定bannerid
     */
    public function getBanner($id) {
        return $id;
    }
}