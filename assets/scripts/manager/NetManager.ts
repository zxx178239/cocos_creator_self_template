import {PROTO_ID_TO_MAP, getProtoMapToId} from "../network/ProtoMsgDefine";
import { NOTIFY_EVENTS } from "../common/EventNotifyDefine";
import {NetworkMsgDispatch} from "../network/NetworkMsgDispatch";
import {FORM_MSG_TO_MAP} from "../network/FormMsgDefine";
import {getProtoMsg} from "../network/ProtoStructDefine";
import { WebSocketProtocal } from "../network/WebSocketProtocal";


class NetManager {
    public static readonly Instance         = new NetManager();

    private _msgCallbackList: any           = [];
    private _networkMsgDispatch: any        = null;
    private _webSocket: any                 = null;

    public connectWS() {
        if(this._webSocket) {
            app.logMgr.error("old websocket not destroy, please confirm");
            return;
        }

        if(this._networkMsgDispatch) {
            app.logMgr.error("you have forgot destroy the networkMsgDispatch");
            return;
        }


        this._webSocket          = new WebSocketProtocal();
        this._networkMsgDispatch = new NetworkMsgDispatch();
        this._startPulse();
        app.eventMsg.addEventListener(NOTIFY_EVENTS.NETWORK_MSG_NOTIFY, this.handleNetworkMsg.bind(this));
    }

    public closeWS() {
        this._stopPulse();
        this._webSocket             = null;
        this._msgCallbackList       = [];
        this._networkMsgDispatch    = null;
        app.eventMsg.removeEventListener(NOTIFY_EVENTS.NETWORK_MSG_NOTIFY, this.handleNetworkMsg.bind(this));    
    }


    public sendProtoMsg(INProto, INParams, INCallback?) {
        if(INCallback && INProto !== PROTO_ID_TO_MAP.FORM_REQ) {
            this._msgCallbackList[INProto] = INCallback;
        }

        let encodeMsg = this._encodeNetworkMsg(INProto, INParams);
        if(this._webSocket) {
            this._webSocket.send(encodeMsg);
        }
    }

    public sendFormMsg(INForm, INParams, INCallback?) {
        if (!FORM_MSG_TO_MAP[INForm]) {
            app.logMgr.error("please define func name in FORM_MSG_TO_MAP in order to code rule");
            return;
        }

        let data = {
            func: INForm,
            params: INParams
        };

        let jsonStr = JSON.stringify(data);

        let reqStruct = getProtoMsg(PROTO_ID_TO_MAP.FORM_REQ);
        reqStruct.strFormInfo = jsonStr;

        if(INCallback) {
            this._msgCallbackList[INForm] = INCallback;
        }
        this.sendProtoMsg(PROTO_ID_TO_MAP.FORM_REQ, reqStruct);
    }

    public handleNetworkMsg(INParams) {
        let decodeInfo  = this._decodeNetworkMsg(INParams);
        let msgName     = decodeInfo[0];
        let decodeMsg   = decodeInfo[1];

        if(msgName === PROTO_ID_TO_MAP.FORM_RSP || msgName === PROTO_ID_TO_MAP.FORM_NOTIFY) {
            this._handleFormMsg(msgName, decodeMsg);
        }else {
            if(this._msgCallbackList[msgName]) {
                this._msgCallbackList[msgName](decodeMsg);
            }else {
                this._networkMsgDispatch.dispatchMsg(msgName, decodeMsg);
            }
        }
    }

    private _startPulse() {

    }

    private _stopPulse() {

    }


    private _handleFormMsg(INMsgName, INParams) {
        if(INParams.status !== 0 && INMsgName === PROTO_ID_TO_MAP.FORM_RSP) {
            app.logMgr.error("form rsp info error: ");
            return;
        }

        if(INParams.code && INParams.code !== 0) {
            app.logMgr.error("handle some operation failed");
            return;
        }

        let objStr = INParams.objStr;

        if(objStr) {
            let data        = JSON.parse(objStr);
            let funcName    = data.func;
            let params      = data.params;

            if(this._msgCallbackList[funcName]) {
                this._msgCallbackList[funcName](params, INParams.code);
            }else {
                this._networkMsgDispatch.dispatchMsg(funcName, params, INParams.code);
            }
        }else {
            app.logMgr.error("objStr error, please confirm");
        }
    }

    private _decodeNetworkMsg(INParams) {
        let receiceData = new DataView(INParams);
        let msgLen       = receiceData.getUint16(0);
        let msgId        = receiceData.getUint16(2);

        if(msgLen !== INParams.byteLength - 2) {
            app.logMgr.error("msg length is error, needLen, curLen: ", msgLen, INParams.byteLength - 2);
            return;
        }

        let mapProtoStruct = PROTO_ID_TO_MAP[String(msgId)]
        if(!mapProtoStruct) {
            app.logMgr.error("map proto struct error, please confirm it has been defined in ProtoMsgDefine! ", msgId);
            return;
        }

        let uint8Array = new Uint8Array(msgLen);
        for (let index = 0; index < msgLen - 2; ++ index) {
            uint8Array[index] = receiceData.getUint8(index + 4);
        }

        let decodeMsg = null;
        if(ProtoJS[mapProtoStruct]) {
            decodeMsg = ProtoJS[mapProtoStruct].decode(uint8Array);
        }else {
            app.logMgr.error("not find in ProtoJS files, please rebuild to create .js file by compile.bat");
            return;
        }

        return [mapProtoStruct, decodeMsg];
    }

    private _encodeNetworkMsg(INMsgProtocal, INParams) {
        if(!ProtoJS[INMsgProtocal]) {
            app.logMgr.error("please confirm in ProtoJS file, maybe you need complie again");
            return;
        }
        let msgId = getProtoMapToId(INMsgProtocal);
        let protoObject = ProtoJS[INMsgProtocal].create(INParams);
        let encodeInfo = ProtoJS[INMsgProtocal].encode(protoObject).finish();

        let infoLen = encodeInfo.length;
        let sendArr = new ArrayBuffer(encodeInfo.length + 4);
        let dataView = new DataView(sendArr, 0, infoLen + 4);
        dataView.setUint16(0, infoLen + 2, false);
        dataView.setUint16(2, parseInt(msgId), false);

        for (let index = 0; index < encodeInfo.length; ++ index) {
            dataView.setUint8(index + 4, encodeInfo[index]);
        }

        return sendArr;
    }
}

export const NetMgr = NetManager.Instance;