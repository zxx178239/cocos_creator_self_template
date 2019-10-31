import { DataBombMan } from "../datas/tilemap/DataBombMan";

/*
 * @Author: xxZhang
 * @Date: 2019-10-30 14:06:45
 * @Description: 数据管理器
 */
class DataManager {
    public static readonly Instance = new DataManager();
    private _dataBombMan: DataBombMan = null;

    constructor() {
        this._dataBombMan = new DataBombMan();
    }

    getDataBombMan() {
        return this._dataBombMan;
    }

}

export const DataMgr = DataManager.Instance;