/*
 * @Author: xxZhang
 * @Date: 2019-05-07 07:26:50
 * @Description: websocket协议
 */
import {NOTIFY_EVENTS} from "../common/EventNotifyDefine";
import { LogMgr, LOG_TAGS } from "../manager/LogManager";

export class WebSocketProtocal {
    private _socket: any                = null;         // socket对象

    onOpen: (event) => void = null;
    onMessage: (event) => void = null;
    onError: (event) => void = null;
    onClose: (event) => void = null;

    public connect(INOptinal?: any) {
        if(this._socket) {
            if(this._socket.readyState === WebSocket.CONNECTING) {
                LogMgr.warn(LOG_TAGS.LOG_NETWORK, "websocket connecting, please wait for a moment");
                return false;
            }
        }

        let url = null;
        let webSocketHead = "ws://";
        if(gameDefine.SERVER_MODE === 1) {
            webSocketHead = "wss://";
        }
        if(INOptinal.url) {
            url = INOptinal.url;
        }else {
            url = `${INOptinal.ip}:${INOptinal.port}`;
        }
        this._socket = new WebSocket(webSocketHead + url);
        this._socket.binaryType = "arraybuffer";
        this._socket.onopen = this.onOpen;
        this._socket.onmessage = this.onMessage;
        this._socket.onerror = this.onError;
        this._socket.onclose = this.onClose;
        return true;
    }

    public send(INParam) {
        if(this._socket) {
            this._socket.send(INParam);
        }
    }

    public close() {
        if(this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }
}