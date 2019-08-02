/*
 * @author: xxZhang
 * @date: Do not editor
 * @desc: 对proto消息进行定义，如消息号， 以及消息号到结构的映射
 */

let FORM_REQ            = "1";                    // 表单请求消息
let FORM_RSP            = "2";                    // 表单响应消息
let FORM_NOTIFY         = "3";                    // 表单通知消息

let TEST_PROTO_CODE     = "10";                    // 测试协议号



export const PROTO_ID_TO_MAP = {
    [FORM_REQ]:                         "form.form_req",
    [FORM_RSP]:                         "form.form_rsp",
    [FORM_NOTIFY]:                      "form.form_notify",

    [TEST_PROTO_CODE]:                  "test.test_req",
}


export function getProtoMapToId(INProto) {
    for(let i in PROTO_ID_TO_MAP) {
        if(PROTO_ID_TO_MAP[i] === INProto) {
            return i;
        }
    }
}