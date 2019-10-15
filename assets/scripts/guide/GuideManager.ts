/*
 * @Author: xxZhang
 * @Date: 2019-10-14 15:18:37
 * @Description: 引导管理器
 */
import { GuideStepConfig } from "../configs/GuideStepConfig";
import { UIMgr } from "../manager/UIManager";
import { GuideModuleConfig } from "../configs/GuideModuleConfig";
import { LayerZOrder } from "../common/LayerZOrderDefine";
import HHelpTools from "../tools/HHelpTools";

class GuideManager {
    public static Instance = new GuideManager();
    private _isGuiding: boolean = false;                 // 是否正处于引导过程中
    private _isSearchingUI: boolean = false;             // 是否正在等待UI启动
    private uiLists: any = [];               // 当前打开的ui的列表
    private _guideIndex: number = -1;               // 引导的索引
    private _guideInfo: any = null;             // 引导信息
    private _guideQueue: any = [];               // 引导队列，主要考虑到A、B引导同时来到的情况

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
                this._guideQueue.push(1);
                // this._guideIndex = 1;
                cb && cb();
            },
            (cb) => {
                this._runGuide();
                cb && cb();
            }
        ], (err) => {
            if (err) {
                console.log("restart check error");
            } else {
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

        // 如果处于等待UI打开的状态
        if (this._isSearchingUI) {
            this._startGuide();
            return;
        }

        // 如果自身模块没有引导或关闭状态，则直接返回
        if (!GuideModuleConfig[INUIName] || GuideModuleConfig[INUIName]["open"] === 0) {
            return;
        }

        let firstStep = GuideModuleConfig[INUIName]["first_step"]
        let guideFlag = HHelpTools.getLocalStorage(`guideId_${firstStep}`);
        if (guideFlag === "1") {
            return;
        }

        // 如果处于引导状态，保存等待引导
        if (this._isGuiding) {
            this._guideQueue.push(firstStep);
        } else {
            this._guideIndex = firstStep;
            this._guideInfo = GuideStepConfig[this._guideIndex];
            this._startGuide();
        }
    }

    /**
     * @description: 当模块移除的时候调用该接口
     * @param : 
     * @return : 
     */
    public removeUI(INUIName) {
        if (this.uiLists[INUIName]) {
            delete this.uiLists[INUIName];
            this.uiLists[INUIName] = null;
        }
    }

    /**
     * @description: 条件触发引导
     * @param : 
     * @return : 
     */
    public doGuideForCondition(INGuideIndex) {
        if (!GuideStepConfig[INGuideIndex]) {
            return;
        }
        if (this._isGuiding) {
            this._guideQueue.push(INGuideIndex);
        } else {
            this._guideIndex = INGuideIndex;
            this._guideInfo = GuideStepConfig[this._guideIndex];
            this._startGuide();
        }
    }

    /**
     * @description: 触发执行下一步操作
     * @param : 
     * @return : 
     */
    public stepEx() {
        if (!this._isGuiding) {
            return;
        }
        this._finishCurGuide();

        // 确定当前支线引导是否结束
        if (this._guideInfo["next_step"] !== -1) {
            this._guideIndex = this._guideInfo["next_step"];
            this._guideInfo = GuideStepConfig[this._guideIndex];
            this._startGuide();
            return;
        }

        // 如果有其他支线的引导需要做的话
        if (this._guideQueue.length > 0) {
            this._guideIndex = this._guideQueue.shift();
            this._guideInfo = GuideStepConfig[this._guideIndex];
            this._startGuide();
            return;
        }

        this._isGuiding = false;
        this._isSearchingUI = false;
        this._guideIndex = -1;
        this._guideInfo = null;
    }

    public _runGuide() {
        this._restartCheck();
        this._startGuide();
    }

    /**
     * @description: 游戏重启后需要做的同步操作
     * @param : 
     * @return : 
     */
    private _restartCheck() {
        if (this._guideQueue.length <= 0) {
            this._guideIndex = 1;
            this._guideInfo = GuideStepConfig[1];
        } else {
            this._guideIndex = this._guideQueue.shift();
            let curGuideInfo = GuideStepConfig[this._guideIndex];
            if (curGuideInfo["sync_step"] !== -1) {
                this._guideInfo = curGuideInfo["sync_step"];
            } else {
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
        this._isGuiding = true;
        // 如果当前步已经跑过了，直接到下一步进行校验
        let guideFlag = HHelpTools.getLocalStorage(`guideId_${this._guideIndex}`);
        if (guideFlag === "1") {
            this.stepEx();
            return;
        }

        if (!this._guideInfo ||
            (this._guideInfo["layer"] && !this.uiLists[this._guideInfo["layer"]])) {
            this._isSearchingUI = true;
            return;
        }
        this._isSearchingUI = false;

        if (this._guideInfo["guide_type"] === 1) {
            // 弱引导
            UIMgr.pushLayer("guide/LayerGuideDialog", LayerZOrder.GUIDE_UI,
                null, this._guideInfo);
        } else if (this._guideInfo["guide_type"] === 2) {
            // 强引导
            UIMgr.pushLayer("guide/LayerGuideButton", LayerZOrder.GUIDE_UI, null,
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
        HHelpTools.setLocalStorage(`guideId_${this._guideIndex}`, 1);
    }
}

export const GuideMgr = GuideManager.Instance;