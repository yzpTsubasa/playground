<?php


namespace app\api\validate;


class IDCollection extends BaseValidate
{
    protected $rule = [
        'ids' => 'require|checkIDs',
        //        'num' => 'in:1,2,3'
    ];

    protected  $message = [
        'ids' => 'ids参数必须是以逗号分隔的一个或多个正整数'
    ];

    protected function checkIDs($value, $rule = '', $data = '', $field = '') {
        $values = explode(',', $value);
        if (empty($value)) {
            return false;
        }
        foreach ($values as $id) {
            if (!$this->isPositiveInt($id)) {
                return false;
            }
        }
        return true;
    }
}