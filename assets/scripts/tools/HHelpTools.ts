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
}