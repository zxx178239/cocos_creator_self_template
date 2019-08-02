/*
 * @author: xxZhang
 * @date: Do not editor
 * @desc: 声明proto消息发送的结构体，主要作用是考虑到代码规范，可以省略，通过.d.ts文件来使用
 */

import {PROTO_ID_TO_MAP} from "./ProtoMsgDefine";

export const PROTO_MSG__STRUCT = {
    [PROTO_ID_TO_MAP.FORM_REQ] : {
        strFormInfo:        "strFormInfo"
    },


}


export const PROTO_MSG__DATA__STRUCT = {
    [PROTO_ID_TO_MAP.FORM_REQ] : {
        strFormInfo:        ""
    }
}


export function getProtoMsg(INProtoDefine) {
    let newStruct = PROTO_MSG__DATA__STRUCT[INProtoDefine];

    if(newStruct) {
        return JSON.parse(JSON.stringify(newStruct));
    }else {
        app.logMgr.error("please define in PROTO_MSG__DATA__STRUCT");
    }
}