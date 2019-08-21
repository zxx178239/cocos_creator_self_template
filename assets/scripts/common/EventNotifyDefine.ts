/*
 * @Author: xxZhang
 * @Date: 2019-05-07 07:26:50
 * @Description: 所有的监听事件号注册
 */

export enum NOTIFY_EVENTS {
	// 测试事件 begin

	TEST_EVENT_CHANGE_LABEL,

	// 测试事件 end

	//////////////////////////////////////////// 网络接收转发 begin
	NETWORK_MSG_NOTIFY,
	//////////////////////////////////////////// 网络接收转发 begin


	//////////////////////////////////////////// 游戏相关监听 begin
	ROCK_MOVE_FOR_CAMERA,
	//////////////////////////////////////////// 游戏相关监听 end
}