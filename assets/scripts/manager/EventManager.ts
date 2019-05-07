import {NOTIFY_EVENTS} from "../common/EventNotifyDefine";

class EventManager {
	public static readonly Instance = new EventManager();

	private _eventLists: any			= {};			// 事件管理列表



	public addEventListener(INEventEnum: NOTIFY_EVENTS, INListenerFunc: Function) {
		let curEventList = this._eventLists[INEventEnum];
		if (!curEventList) {
			this._eventLists[INEventEnum] = [];
		}

		this._eventLists[INEventEnum].push(INListenerFunc);
	}

	public removeEventListener(INEventEnum: NOTIFY_EVENTS, INListenerFunc: Function) {
		let curEventList = this._eventLists[INEventEnum];

		if (!curEventList) {
			return;
		}

		for (let i = 0; i < curEventList.length; ++ i) {
			if (curEventList[i] === INListenerFunc) {
				curEventList.splice(i, 1);
				break;
			}
		}

		if (curEventList.length === 0) {
			this._eventLists.splice(INEventEnum, 1);
		}
	}

	public dispatchEvent(INEventEnum: NOTIFY_EVENTS, ...INParams: any []) {
		let curEventList = this._eventLists[INEventEnum];

		if (!curEventList) {
			return;
		}

		for (let i = 0; i < curEventList.length; ++ i) {
			let curFunc = curEventList[i];
			if (curFunc) {
				curFunc(...INParams);
			}
		}
	}

	
	public clearAllEventListener() {
		for (let i in this._eventLists) {
			this._eventLists[i] = [];
		}
		this._eventLists = {};
	}
}

export const EventMgr = EventManager.Instance;