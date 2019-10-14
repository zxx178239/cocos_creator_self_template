/*
 * @Author: xxZhang
 * @Date: 2019-10-14 14:42:33
 * @Description: 引导步配置表
 */

 /** 参数说明
  * layer: 指明当前引导步发生的场景
  * guide_type：指明引导的类别：1表明是弱引导、2表明是强引导
  * next_step: 指明下一步，-1表明是最后一步
  * sync_step: 同步步，主要用于断线或杀进程重新进游戏的起始步
  * button_name: 强引导用到的按钮名字
  * button_shape: 按钮形状，1表明是矩形，2表明是圆形
  * desc: 描述，对于弱引导来说可以用于文字上的显示，随意
  * delay_time: 这个主要考虑到UI加载需要时间，不给延迟的话会出现位置bug，所以给了一个延迟的参数，不填默认是100的延迟
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
        "button_name": "ButtonSignin",
        "button_shape": 1,
        "next_step": 3,
        "sync_step": 1,
        "desc": "引导点击签到按钮"
    },
    3: {
        "layer": "LayerSignin",
        "guide_type": 2,
        "button_name": "ButtonClose",
        "button_shape": 1,
        "next_step": 4,
        "sync_step": -1,
        "desc": "引导签到关闭"
    },
    4: {
        "layer": "guidescene",
        "guide_type": 2,
        "button_name": "ButtonActivity",
        "button_shape": 1,
        "next_step": 5,
        "sync_step": -1,
        "desc": "引导点击活动按钮"
    },
    5: {
        "layer": "LayerActivity",
        "guide_type": 2,
        "button_name": "ButtonClose",
        "button_shape": 1,
        "next_step": 6,
        "sync_step": -1,
        "desc": "引导活动关闭"
    },
    6: {
        "layer": "guidescene",
        "guide_type": 2,
        "button_name": "ButtonGift",
        "button_shape": 1,
        "next_step": 7,
        "sync_step": -1,
        "desc": "引导点击礼包按钮"
    },
    7: {
        "layer": "LayerGift",
        "guide_type": 2,
        "button_name": "ButtonClose",
        "button_shape": 1,
        "next_step": -1,
        "sync_step": -1,
        "delay_time": 1000,
        "desc": "引导活动关闭"
    },
}
