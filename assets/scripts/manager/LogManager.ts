class LogManager {
    public static readonly Instance = new LogManager();

    private _combineParams(...INParams) {
        let newStr = "";
        for(let i = 0; i < arguments.length; ++ i) {
            newStr += (arguments[i] + " ");
        }
        return newStr;
    }

    log(...INParams) {
        if(gameDefine.SERVER_MODE === 1) {
            return;
        }
        let printStr = this._combineParams(...INParams);
        
        console.log(printStr);
    }

    warn() {

    }

    error(...INParams) {
        let printStr = this._combineParams(...INParams);
        
        console.error(printStr);
    }


}

export const LogMgr = LogManager.Instance;
