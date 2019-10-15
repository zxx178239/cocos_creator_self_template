/*
 * @Author: xxZhang
 * @Date: 2019-10-15 10:59:55
 * @Description: 校验等级
 */
import { GuideCheckBase } from "./GuideCheckBase";
export class GuideCheckLevel extends GuideCheckBase {

    /**
     * @description: 校验条件
     * @param : 
     * @return : 
     */
    public checkCondition(INParams) {
        let level = INParams[0];
        if(level >= 10) {
            cc.systemEvent.emit("level_unlock");
        }
    }
}