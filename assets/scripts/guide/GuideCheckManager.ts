import { GuideConditions } from "./GuideConst";

/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:18:44
 * @Description: 引导校验管理器，用于判定是否满足开启的条件
 */

class GuideCheckManager {
    public static Instance = new GuideCheckManager();

    public checkGuide(INGuideObject, ...INOtherParams) {
        if(INGuideObject) {
            INGuideObject.checkCondition(INOtherParams);
        }
    }
}

export const GuideCheckMgr = GuideCheckManager.Instance;


