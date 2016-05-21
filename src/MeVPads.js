define("mevpads",function(){
var React = require("react");
var ReactDOM = require("react-dom");
var Hammer = require("react-hammerjs");
var PadBuffer = React.createClass({
	getDefaultProps:function(){
		return {
			article:null,
			idx:0,
			pageWidth:720,
			posIdx:0,
		};
	},
	getInitialState:function(){
		return {
			active:false,
			pageIdx:null,
			posIdx:this.props.posIdx
		};
	},
	_getPageElement:function(){
		if(this.state.pageIdx == null) return null;
		return this.props.article.getPageByIdx(this.state.pageIdx);
	},
	_getPageInstance:function(){
		if(this.state.pageIdx == null) return null;
		return this.props.article.getPageInstanceByIdx(this.state.pageIdx);
	},	
	componentDidUpdate(prevProps,prevState){
		var react_page = this._getPageInstance();
		if(react_page != null && this.state.active != prevState.active){
			react_page.setState({active:this.state.active});
			console.log("react page update with ",this.state);
		}
	},
	render:function(){
		var css = {
				transform:"translate3d(" + this.props.pageWidth * this.state.posIdx + "px,0px,0px)"
			}
		var className = this.state.active ? "active":"deactive";
		className += " page_container "
		var pageInstance = this._getPageElement();
		if(pageInstance != null) return <div id={this.props.id} className={className} style={css}>{pageInstance}</div>;
		else return <div id={this.props.id} className={className} style={css}></div>;
	},
});


/***
对hammer进行扩展，在一个大的Touch Div下，处理事件的propogation prevent
**/
var MeHammer = function(hammer,default_handler){
	var self = this;
	this.hammer = hammer;
	this.defaultHandler = default_handler;
	this.listeners = {};
	this.hammer.on("swipeleft swiperight swipeup swipedown",function(evt){self.handleSwipe(evt);});
}
MeHammer.prototype.handleSwipe = function(evt){
	if(this.listeners.hasOwnProperty(evt.type)){
		var evt_listeners = this.listeners[evt.type];
		var curElm = evt.target;
		//向上遍历数，直到hammer的绑定元素
		while(curElm != null && curElm != this.hammer.element){
			for(i = 0;i < evt_listeners.length;i ++){
				if(evt_listeners[i].elem == curElm){
					if(evt_listeners[i].func.apply([evt]) == false) return;
				}
			}
			curElm = curElm.parentElement;
		}
	}
	if(this.defaultHandler.hasOwnProperty(evt.type)){
		this.defaultHandler[evt.type].apply([evt]);
	}
}
MeHammer.prototype.on = function(evttype,_elem,_func){
	if(!this.listeners.hasOwnProperty(evttype)) this.listeners[evttype] = [];
	this.listeners[evttype].push({elem:_elem,func:_func});
	return;
};
MeHammer.prototype.off = function(evttype,source){
	if(!this.listeners.hasOwnProperty(evttype)) return;
	var evt_listeners = this.listeners[evttype];
	var i = 0;
	for(i = 0;i < evt_listeners.length;i ++){
		if(evt_listeners[i].elem == source)break;
	}
	if(i < evt_listeners.length){
		evt_listeners.splice(i,1);
	}
};
/**
虚拟操作面板
**/
var MeVPads = React.createClass({
	getInitialState:function(){
		this.lastTouchX = null;
		this.lastDeltaX = 0;
		this.bufferItems = [];
		return {
			actPosIndex:-1,
			offset:0,
		};
	},
	getDefaultProps:function(){
		return {
			bufferLen:3,
			pageHeight:1192,
			pageWidth:720,
			article:null,
		};
	},
	
	componentWillMount:function(){
		if(this.props.bufferLen == null || this.props.bufferLen < 3 || this.props.bufferLen > 10 )
			this.props.bufferLen = 3;
	},
	_setBufferItemState:function(pos, newState){
		var bufIdx = pos % this.props.bufferLen;
		if(bufIdx < this.bufferItems.length && this.bufferItems[bufIdx] != null ){
			this.bufferItems[bufIdx].setState(newState);
			console.log("set buffer " + bufIdx + " state ",newState);
		}
	},
	moveNext:function(){
		if(this.state.actPosIndex >= 0){
			this._setBufferItemState(this.state.actPosIndex,{active:(false)});
		}
		var new_act = this.state.actPosIndex + 1;
		if(new_act >= this.props.article.getNumOfPage())return;	//reach end of page
		
		this._setBufferItemState(new_act,{active:(true),pageIdx:new_act});
		this._setBufferItemState(new_act + 1,{pageIdx:(new_act+1)});
		this.setState({offset:0,actPosIndex:this.state.actPosIndex + 1});
	},
	movePrev:function(){
		if(this.state.actPosIndex > 0){
			this._setBufferItemState(this.state.actPosIndex,{active:(false)});
		}
		var new_act = this.state.actPosIndex - 1;
		if(new_act < 0) new_act = this.props.bufferLen + new_act;	//to the end
		this._setBufferItemState(new_act,{active:(true)});
		this._setBufferItemState(new_act - 1,{pageIdx:(new_act - 1)});
		this.setState({offset:0,actPosIndex:new_act});
	},
	handleTouchEnd:function(evt){
		if(Math.abs(this.lastDeltaX) > this.props.pageWidth / 2){
			if(this.lastDeltaX < 0) this.moveNext();
			else this.movePrev();
		}
	},
	handleTouchMove:function(evt){
		var touchP = evt.targetTouches[0];
		if(this.lastTouchX == null){
			this.lastTouchX = touchP.clientX;
			return;
		}
		this.lastDeltaX = touchP.clientX - this.lastTouchX;
		if(Math.abs(this.lastDeltaX) > 10){
			this.setState({offset:this.lastDeltaX});
		}
	},
	handleTouchStart:function(evt){
		this.lastTouchX = null;
		this.lastDeltaX = 0;
		console.log("pad detect touch");
	},
	
	handleSwipe:function(evt){
		console.log("swipe ",evt);
		if(evt.direction == 2){
			this.moveNext();
		}else if (evt.direction == 1){
			this.movePrev();
		}
	},
	handleTap:function(evt){
		console.log("get tap in pad ",evt);
	},
	componentDidMount:function(){
		this.moveNext();
	},
	_registerBuffer:function(ref){
		this.bufferItems[ref.props.id] = ref;
	},
	_registerHammer:function(ref){
		//this.hammer = ref;
		this.props.article.getCxt().interactHandler = new MeHammer(ref.hammer,{"swipeleft":this.moveNext,"swiperight":this.movePrev});
	},
	render:function(){
		
		var offset_x = -(this.props.pageWidth * this.state.actPosIndex) + this.state.offset;
		var divStyle = {
			width: "auto",
			height: "1008px",
			"transform":"translate3d(" + offset_x + "px,0px,0px)",
			"backfaceVisibility": "hidden", 
			"perspective": "1000px", 
			"top":"36.5px",
			"left": "0px"
		};
		var self = this;
		
		var items = [];
		for(i = 0;i < this.props.bufferLen;i++){
			items.push(<PadBuffer id={i} posIdx={i} ref={self._registerBuffer} article = {self.props.article}></PadBuffer>)
		}
		return (
			<Hammer ref={this._registerHammer} id="oper-area" className ="magazine-page-container show">
			<div>
			<div style={divStyle}>
			{items}
			</div>
			{self.props.article.getToolBar()}
			</div>
			</Hammer>
		);
	},
	
});

	return MeVPads;
});
