var React = require("react");
var ReactDOM = require("react-dom");
var MeArticle = require("../src/me-article.js");
var Mag_1 = require("../dist/mag_1.js");
var MeVPads = React.createClass({
	getInitialState:function(){
		this.lastTouchX = null;
		this.lastDeltaX = 0;
		return {
			act_index:0,
			offset:0,
			items:[]
		};
	},
	getDefaultProps:function(){
		return {
			buffer_len:3,
			page_height:1008,
			page_width:600,
			article:null,
		};
	},
	
	componentWillMount:function(){
		var _buffer_len = 3;
		if(this.props.buffer_len != null && this.props.buffer_len > 3 && this.props.buffer_len < 10 ){
			_buffer_len = this.props.buffer_len;
		}
		for(var i = 0; i < _buffer_len ; i ++){
			var css = {
				transform:"translate3d(" + this.props.page_width * i + "px,0px,0px)"
			}
			this.state.items.push(<div id={i} className ="page_container" style={css}>{this.props.article.getPageByIdx(i)}</div>);
		}
	},
	handleTouchEnd:function(evt){
		if(Math.abs(this.lastDeltaX) > this.props.page_width / 2){
			if(this.lastDeltaX < 0) this.setState({offset:0,act_index:this.state.act_index - 1});
			else this.setState({offset:0,act_index:this.state.act_index + 1});
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
	},
	render:function(){
		
		var offset_x = this.props.page_width * this.state.act_index + this.state.offset;
		var divStyle = {
			width: "640px",
			height: "1008px",
			transform: "translateZ(0px) scale3d(0.5625, 0.5625, 1)",
			"transform":"translate3d(" + offset_x + "px,0px,0px)",
			//this.props.page_width * this.state.act_index + "px,0px,0px)",
			"backface-visibility": "hidden", 
			"perspective": "1000px", 
			"top":"36.5px",
			"left": "0px"
		};
		return (
			<div onTouchCancel={this.handleTouchEnd} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} id="con" className ="magazine-page-container show"
			style={divStyle}>
			{this.state.items}
			</div>
		);
	}
});

module.exports = MeVPads;