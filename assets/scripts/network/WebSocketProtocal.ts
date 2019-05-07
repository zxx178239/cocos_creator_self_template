import {NOTIFY_EVENTS} from "../common/EventNotifyDefine";

export class WebSocketProtocal {

    private _ip: string                 = "";           // 连接ip
    private _port: number               = -1;           // 连接端口
    private _socket: any                = null;         // socket对象

    public connect(INIp: string, INPort: number, INSuccessCallback: Function, INFailCallback: Function) {
        this._ip        = INIp;
        this._port      = INPort;

        let webSocketHead = "ws://";

        if(gameDefine.SERVER_MODE === 1) {
            webSocketHead = "wss://";
        }

        let ws = new WebSocket(webSocketHead + this._ip + ":" + this._port + "/wss");
        ws.binaryType = "arraybuffer";

        ws.onopen = function(event) {
            app.logMgr.log("open websocket success");
            if(INSuccessCallback) {
                INSuccessCallback();
            }
        };

        ws.onmessage = function(event) {
            app.eventMgr.dispatchEvent(NOTIFY_EVENTS.NETWORK_MSG_NOTIFY, event.data);
        };

        ws.onerror = function(event) {
            app.logMgr.error("error websocket: ");
            if(INFailCallback) {
                INFailCallback();
            }
        };

        ws.onclose = function(event) {
            app.logMgr.error("on close websocket");
            if(INFailCallback) {
                INFailCallback();
            }
        }

        this._socket = ws;
    }

    public sendMsg(INParam) {
        if(this._socket) {
            this._socket.send(INParam);
        }
    }
}