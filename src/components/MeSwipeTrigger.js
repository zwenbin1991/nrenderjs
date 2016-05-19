var React = require("react");
var ReactDOM = require("react-dom");
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
				evtName:"trigger1",
				swipeDirection:"downup",
				style:"",
			}
		},
		handleTouchEnd:function(evt){},
		handleTouchMove:function(evt){},
		handleTouchStart:function(evt){
			console.log("in Swipe Detect");
			if(this.state.active){
				evt.stopPropagation();
				this.setState({active:false});
			}else{
				console.log("let it go");
			}
		},
		render:function(){
			return <div style={this.props.style} onTouchCancel={this.handleTouchEnd} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} className="opacity">{this.props.children}</div>;
		}});
	return MePage;
});
