import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";
import { EventMgr } from "../manager/EventManager";
import { PATH_HEADS } from "../common/GameDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {
    protected prefabUrl: string;                                // 指明当前prefab的路径，主要用于删除资源
    protected className: string;                                // 记录类名，主要用于打印日志的时候指明类的名字
    private _registerEventList: Map<number, Function>;          // 注册事件列表

    onLoad() {
        this._registerEventList = new Map<number, Function>();
        this.onUILoad();
    }

    start () {

    }

    onDestroy() {

    }

    onDisable() {
        this._registerEventList.forEach((f, key) => {
            EventMgr.removeEventListener(key, f);
        });
        this._registerEventList.clear();
    }

    public getUrl() {
        return PATH_HEADS.PREFAB + this.prefabUrl;
    }

    public getName() {
        return this.className;
    }

    /**
     * @description: 注册事件
     * @param : INEventName: 事件名; INCallback: 回调函数
     * @return : 
     */
    public registerEvents(INEventName: NOTIFY_EVENTS, INCallback: Function) {
        EventMgr.addEventListener(INEventName, INCallback);
        this._registerEventList.set(INEventName, INCallback);
    }

    /**
     * @description: 用于初始化当前的UI的接口，所有的都统一用此接口
     * @param : 
     * @return : 
     */
    public initUI(INParams, ...otherParam) {

    }

    public onUILoad() {

    }

    // update (dt) {}
}
