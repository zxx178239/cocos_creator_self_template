/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:18:37
 * @Description: 引导管理器
 */
import { GuideStepConfig } from "../configs/GuideStepConfig";
import { UIMgr } from "../manager/UIManager";

class GuideManager {
    public static Instance = new GuideManager();
    private _isGuiding: boolean = false;                 // 是否正处于引导过程中
    private _isSearchingUI: boolean = false;             // 是否正在等待UI启动
    private uiLists: any            = [];               // 当前打开的ui的列表
    private _guideIndex: number      = -1;               // 引导的索引
    private _guideInfo: any          = null;             // 引导信息


    public initGuide() {
        this._guideIndex = -1;
        this._isGuiding = false;
        this._isSearchingUI = false;
        this._guideInfo = null;
    }

    /**
     * @description: 从服务端同步数据
     * @param : 
     * @return : 
     */
    public syncFromServer() {
        async.series([
            // 像服务端请求玩家guideIndex，暂时先在本地模拟
            (cb) => {
                this._guideIndex = 1;
                cb && cb();
            },
            (cb) => {
                this._runGuide();
                cb && cb();
            }
        ], (err) => {
            if(err) {
                console.log("restart check error");
            }else {
                console.log("restart check ok");
            }
        })
    }

    /**
     * @description: 当模块启动的时候调用该接口
     * @param : 
     * @return : 
     */
    public addUI(INUIName, INUINode) {
        this.uiLists[INUIName] = INUINode;
        if(this._isSearchingUI) {
            this._startGuide();
        }
    }

    /**
     * @description: 当模块移除的时候调用该接口
     * @param : 
     * @return : 
     */
    public removeUI(INUIName) {
        if(this.uiLists[INUIName]) {
            delete this.uiLists[INUIName];
            this.uiLists[INUIName] = null;
        }
    }

    /**
     * @description: 触发执行下一步操作
     * @param : 
     * @return : 
     */
    public stepEx() {
        if(!this._isGuiding) {
            return;
        }
        this._finishCurGuide();

        if(this._guideInfo["next_step"] !== -1) {
            this._guideIndex = this._guideInfo["next_step"];
            this._guideInfo = GuideStepConfig[this._guideIndex];
            this._startGuide();
        }
    }

    public _runGuide() {
        this._isGuiding = true;
        this._restartCheck();
        this._startGuide();
    }

    /**
     * @description: 游戏重启后需要做的同步操作
     * @param : 
     * @return : 
     */
    private _restartCheck() {
        if(this._guideIndex === null || this._guideIndex === -1) {
            this._guideInfo = GuideStepConfig[1];
        }else {
            let curGuideInfo = GuideStepConfig[this._guideIndex];
            if(curGuideInfo["sync_step"] !== -1) {
                this._guideInfo = curGuideInfo["sync_step"];
            }else {
                this._guideInfo = curGuideInfo;
            }
        }
    }

    /**
     * @description: 开启进行引导操作
     * @param : 
     * @return : 
     */
    private _startGuide() {
        if(!this._guideInfo || !this.uiLists[this._guideInfo["layer"]]) {
            this._isSearchingUI = true;
            return;
        }
        this._isSearchingUI = false;
        
        if(this._guideInfo["guide_type"] === 1) {
            // 弱引导
            UIMgr.pushLayer("guide/LayerGuideDialog", null, null, this._guideInfo);
        }else if(this._guideInfo["guide_type"] === 2) {
            // 强引导
            UIMgr.pushLayer("guide/LayerGuideButton", null, null, 
                this._guideInfo, this.uiLists[this._guideInfo["layer"]]);
        }
    }

    /**
     * @description: 结束当前步的引导
     * @param : 
     * @return : 
     */
    private _finishCurGuide() {
        // 将引导情况发送给服务端

    }
}

export const GuideMgr = GuideManager.Instance;