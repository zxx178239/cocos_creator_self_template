/*
 * @Author: xxZhang
 * @Date: 2019-10-30 14:08:03
 * @Description: 炸弹人数据
 */

export class DataBombMan {

    private _bombPower: number          = 1;

    constructor() {

    }

    /**
     * @description: 设置及获取炸弹的威力
     * @param : 
     * @return : 
     */
    setBombPower(INPower) {
        this._bombPower = INPower;
    }

    addBombPower(INDiff) {
        this._bombPower += INDiff;
    }

    getBombPower() {
        return this._bombPower;
    }
}