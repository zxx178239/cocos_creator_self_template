import {LogMgr} from "./LogManager"
import {EventMgr} from "./EventManager"
import {UIMgr} from "./UIManager"

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppManager extends cc.Component {
	logMgr: any				= null;
	eventMgr: any			= null;
	uiMgr: any				= null;


	onLoad() {
		cc.game.addPersistRootNode(this.node);
	}


	initManager() {
		this.logMgr 		= LogMgr;
		this.eventMgr		= EventMgr;
		this.uiMgr			= UIMgr;
	}
}
