/*
 * @author: xxZhang
 * @date: Do not editor
 * @desc: 控制消息的派发，通过该派发，可以指明每个消息的具体的处理函数
 */

import {PROTO_ID_TO_MAP} from "./ProtoMsgDefine";
import {ProtoMsgHandle} from "./ProtoMsgHandle";

import {FORM_MSG_TO_MAP} from "./FormMsgDefine";
import {FormMsgHandle} from "./FormMsgHandle";


const MsgDefineToFuncMap = {
    //////////////////////////////////////////////////////// form 消息映射
    [FORM_MSG_TO_MAP.FORM__TEST_FORM]   :           FormMsgHandle.testFormRsp,                      // 测试form消息响应映射







    //////////////////////////////////////////////////////// proto 消息映射
    [PROTO_ID_TO_MAP.TEST_PROTO_CODE]   :           ProtoMsgHandle.testRsp,                         // 测试proto消息响应映射
}



export class NetworkMsgDispatch {
    public dispatchMsg(INMsgDefine, ...INParam: any[]) {
        let funcName = MsgDefineToFuncMap[INMsgDefine]

        if(funcName) {
            funcName(...INParam);
        }else {
            app.logMgr.error("msg not define:", INMsgDefine);
        }
    }
}