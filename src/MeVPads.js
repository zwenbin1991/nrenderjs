var React = require("react");
var ReactDOM = require("react-dom");
var MeArticle = require("../src/me-article.js");
var Mag_1 = require("../dist/mag_1.js");
var PadBuffer = React.createClass({
	getDefaultProps:function(){
		return {
			article:null,
			idx:0,
			pageWidth:600,
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
			pageHeight:1008,
			pageWidth:600,
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
	componentDidMount:function(){
		this.moveNext();
	},
	_registerBuffer:function(ref){
		this.bufferItems[ref.props.id] = ref;
	},
	render:function(){
		
		var offset_x = -(this.props.pageWidth * this.state.actPosIndex) + this.state.offset;
		var divStyle = {
			width: "640px",
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
			<div onTouchCancel={this.handleTouchEnd} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} id="oper-area" className ="magazine-page-container show">
			<div style={divStyle}>
			{items}
			</div>
			</div>
		);
	},
	
});

module.exports = MeVPads;