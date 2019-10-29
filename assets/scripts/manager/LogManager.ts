/*
 * @Author: xxZhang
 * @Date: 2019-08-01 21:08:31
 * @Description: 日志管理器
 */
// 日志标签记录
// level : 2, 3, 4 ==> error | error、warn | error、warn、log
export const LOG_TAGS = {
    ALL_OPEN: true,
    LOG_HALL: { level: 2 },
    LOG_POP_UI: { level: 3},
    LOG_BALL_GAME_UI: {level: 4},
    LOG_NETWORK: {level: 2},
}


class LogManager {
    public static readonly Instance = new LogManager();

    private _combineParams(...INParams) {
        let newStr = "";
        for(let i = 0; i < arguments.length; ++ i) {
            newStr += (arguments[i] + " ");
        }
        return newStr;
    }

    /**
     * @description: 普通日志打印
     * @param : INTag: 参数标志
     * @return : 
     */
    log(INTag, ...INParams) {
        if(!LOG_TAGS.ALL_OPEN) {
            return;
        }
        if(INTag.level < 4) {
            return;
        }

        let printStr = this._combineParams(...INParams);
        
        console.log(printStr);
    }

    /**
     * @description: 警告日志打印
     * @param : INTag: 场景标志
     * @return : 
     */
    warn(INTag, ...INParams) {
        if(!LOG_TAGS.ALL_OPEN) {
            return;
        }
        if(INTag.level < 3) {
            return;
        }

        let printStr = this._combineParams(...INParams);
        
        console.warn(printStr);
    }

    /**
     * @description: 
     * @param : 
     * @return : 
     */
    error(INTag, ...INParams) {
        if(!LOG_TAGS.ALL_OPEN) {
            return;
        }
        if(INTag.level < 2) {
            return;
        }
        let printStr = this._combineParams(...INParams);
        
        console.error(printStr);
    }


}

export const LogMgr = LogManager.Instance;
