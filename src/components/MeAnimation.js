var React = require("react");
var ReactDOM = require("react-dom");
var _assign = require('object-assign');
define("MeAnimation",function(){
	var MePage  = React.createClass({
		getInitialState:function(){
			return{
				animationState:"no start"
			}
		},
		getDefaultProps:function(){
			return {
				className_Active:"fadeIn animated",
				className_Deactive:"",
				animation:{
					animationIterationCount:"1",
					animationDelay:"2.3s",
					animationDuration:"1s"
				}
			}
		},
		pageActive:function(evt){
			console.log("anmination receive page Active Change ",evt);
			if(evt.active){
				this.setState({animationState:"start"});
			}else{
				this.setState({animationState:"no start"});
			}
		},
		componentWillMount:function(){
			var pageActEvt = "page-" + this.props.page_id + ":active_change";
			console.log("meAnimation ready to init listen to:" + pageActEvt,this.props);
			this.props.ee.addListener(pageActEvt,this.pageActive);
		},
		render:function(){
			var className = this.state.animationState == "start" ? this.props.className_Active:this.props.className_Deactive;
			return <div className={className} style={_assign(this.props.animation,{height:"34px"})}> {this.props.children}</div>
		}});
	return MePage;
});
