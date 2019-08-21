/*
 * @Author: xxZhang
 * @Date: 2019-08-01 20:45:18
 * @Description: 工具类
 */
import { PATH_HEADS } from "../common/GameDefine";
import { LogMgr, LOG_TAGS } from "../manager/LogManager";

export default class HHelpTools {

    public static requirePrefab(INPrefabFilePath: string, INCallback: Function) {
        let completePath = PATH_HEADS.PREFAB + INPrefabFilePath;

        let prefabRes = cc.loader.getRes(completePath);

        if(prefabRes) {
            INCallback(cc.instantiate(prefabRes));
            return;
        }

        cc.loader.loadRes(completePath, cc.Prefab, function(err, res) {
            if(err) {
                LogMgr.error(LOG_TAGS.LOG_POP_UI, "load prefab error", err, completePath);
                return;
            }

            INCallback(cc.instantiate(res));
        })
    }

    /**
     * @description: 对数字前置补0
     * @param : 
     * @return : 
     */
    public static addPreZero(INNum) {
        return ('00' + INNum).slice(-2);
    }

    /**
     * @description: 基于地图大小来随机坐标点
     * @param : 
     * @return : 
     */
    public static getRandomPos() {
        let randX = Math.random() * 3840 - 1920;
        let randY = Math.random() * 2160 - 1080;
        return cc.v2(randX, randY);
    }
}