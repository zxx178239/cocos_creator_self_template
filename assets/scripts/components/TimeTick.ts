import TimeTools from "../tools/TimeTools";
import { TIME_TYPES } from "../common/GameDefine";
import HHelpTools from "../tools/HHelpTools";

/*
 * @Author: xxZhang
 * @Date: 2019-08-19 19:15:06
 * @Description: 倒计时组件，主要用于倒计时的操作，必须保证当前组件挂载的节点是一个label
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeTick extends cc.Component {

    private _timeEndCallback: Function = null;
    private _timeTickType: number      = -1;
    private _endTime: number           = -1;

    onLoad () {}

    start () {

    }

    /**
     * @description: 设置倒计时结束的回调函数
     * @param : 
     * @return : 
     */
    setEndCallback(INCallback) {
        this._timeEndCallback = INCallback;
    }

    /**
     * @description: 设置倒计时刷新类别, 1是分秒形式、2是时分秒形式
     * @param : 
     * @return : 
     */
    setTimeTickType(INType) {
        this._timeTickType = INType;
    }

    /**
     * @description: 设置倒计时剩余时间
     * @param : 
     * @return : 
     */
    setEndTime(INEndTime) {
        this._endTime = INEndTime;
    }

    startTimeTick() {
        this.updateUI();
        this.schedule(this.updateTime, 1);
    }

    updateTime() {
        this._endTime = this._endTime - 1;

        if(this._endTime <= 0) {
            this.stopTimeTick();
            this.updateUI();
            this._timeEndCallback && this._timeEndCallback();
            return;
        }
        this.updateUI();
    }

    stopTimeTick() {
        this.unschedule(this.updateTime);
    }

    updateUI() {
        let timeInfo = TimeTools.calTimeInfoByNum(this._endTime, this._timeTickType);
        if(this._timeTickType === TIME_TYPES.MIN_AND_SEC) {
            this.node.getComponent(cc.Label).string = 
                    `${HHelpTools.addPreZero(timeInfo[0])}:${HHelpTools.addPreZero(timeInfo[1])}`; 
        }else {
            this.node.getComponent(cc.Label).string = 
                    `${HHelpTools.addPreZero(timeInfo[0])}:${HHelpTools.addPreZero(timeInfo[1])}:${HHelpTools.addPreZero(timeInfo[2])}`; 
        }
    }

    // update (dt) {}
}
