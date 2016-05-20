var React = require("react");
var ReactDOM = require("react-dom");
var Hammer = require("react-hammerjs");
var _assign = require("object-assign");
define("MeSwipeTrigger",function(){
	var MePage  = React.createClass({
		getInitialState:function(){
			return{
				triggeredCount:0,
				active:true
			}
		},
		getDefaultProps:function(){
			return {
				repeat:false,
				evtName:"trigger1",			//检测到交互事件后，发送的事件
				normalStyle:{},
				listenEvt:{//
					active:null,				//激活检测的事件
					triggerEvt:"swipeleft",		//需要检测的交互事件
				}
			}
		},
		handleSwipe:function(evt){
			return false;
			//evt.preventDefault();
		},
		_triggerEvent:function(){//发送事件
			if(this.props.repeat == false && this.state.triggeredCount > 0){
			//禁止反复触发
				this.detectionActive(false);
				return true;
			}
			this.props.cxt.ee.emitEvent(this.props.evtName,this);
			this.state.triggeredCount ++;
			return false;
			
		},
		detectionActive:function(enable){
			if(this.props.cxt.interactHandler != null && this.props.listenEvt.triggerEvt != null){
				if(enable == false) this.props.cxt.interactHandler.off(this.props.listenEvt.triggerEvt,this.refs.meswipe);
				else{this.props.cxt.interactHandler.on(this.props.listenEvt.triggerEvt,this.refs.meswipe,this._triggerEvent);}
			}
		},
		_detectionActive:function(){
			this.state.triggeredCount = 0;
			this.detectionActive(true);
		},
		componentWillMount:function(){
			if(this.props.listenEvt.active != null)
				this.props.cxt.ee.addListener(this.props.listenEvt.active,this._detectionActive);
		},
		componentWillUnmount:function(){
			if(this.props.listenEvt.active != null)
				this.props.cxt.ee.removeListener(this.props.listenEvt.active,this._detectionActive);
			this.detectionActive(false);
		},
		render:function(){
			return <div ref="meswipe" id="registerTouch" style={this.props.normalStyle}>{this.props.children}</div>
		}});
	return MePage;
});
