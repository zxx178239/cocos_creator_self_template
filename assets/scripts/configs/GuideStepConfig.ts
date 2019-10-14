/*
 * @Author: xxZhang
 * @Date: 2019-10-14 14:42:33
 * @Description: 引导步配置表
 */

export const GuideStepConfig = {
    1: {
        "layer": "guidescene",
        "guide_type": 1,
        "next_step": 2,
        "sync_step": -1,
        "desc": "引导场景初始的引导",
    },
    2: {
        "layer": "guidescene",
        "guide_type": 2,
        "button_name": "ButtonShop",
        "button_shape": 1,
        "next_step": 3,
        "sync_step": 1,
        "desc": "引导点击商城按钮"
    },
    3: {
        
    }
}
