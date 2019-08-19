import { TIME_TYPES } from "../common/GameDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-08-19 19:23:48
 * @Description: 时间工具类
 */

export default class TimeTools {

    /**
     * @description: 基于数字计算出时分秒的形式
     * @param : 
     * @return : 
     */
    private static _getHourMinAndSec(INNum: number) {
        let hour = Math.floor(INNum / 3600);
        let min = Math.floor((INNum - hour * 3600) / 60);
        let sec = INNum % 3600 - min * 60;
        return [hour, min, sec];
    }


    private static _getMinAndSec(INNum: number) {
        let min = Math.floor(INNum / 60);
        let sec = INNum % 60;
        return [min, sec]
    }

    /**
     * @description: 基于当前数字和类别来计算时间信息
     * @param : 
     * @return : 
     */
    public static calTimeInfoByNum(INNum: number, INTimeType: number) {
        if(INTimeType === TIME_TYPES.MIN_AND_SEC) {
            return this._getMinAndSec(INNum);
        }else if(INTimeType === TIME_TYPES.HOUR_MIN_AND_SEC) {
            return this._getHourMinAndSec(INNum);
        }
    }
}
