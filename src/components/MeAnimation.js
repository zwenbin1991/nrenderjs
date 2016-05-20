define("MeAnimation",function(){
var React = require("react");
var ReactDOM = require("react-dom");
var _assign = require("object-assign");	
	var MePage  = React.createClass({
		getInitialState:function(){
			return{
				animationState:"no start"
			}
		},
		getDefaultProps:function(){
			return {
				listenEvt:{//字符串，定义哪些事件触发动画启动
					active:null,
					deactive:null
				},
				className_Active:"animated",
				className_Deactive:"hidden",
				animationClass:"fadeIn",
				animation:{
					animationIterationCount:"1",
					animationDelay:"0s",
					animationDuration:"1s"
				},
				normalStyle:{
					position:"absolute",
				}
			}
		},
		animationActive:function(evt){
			this.setState({animationState:"start"});
		},
		animationDeactive:function(evt){
			this.setState({animationState:"no start"});
		},
		componentWillMount:function(){
			if(this.props.listenEvt.active != null)
				this.props.cxt.ee.addListener(this.props.listenEvt.active,this.animationActive);
			if(this.props.listenEvt.deactive != null)
				this.props.cxt.ee.addListener(this.props.listenEvt.deactive,this.animationDeactive);
		},
		componentWillUnmount:function(){
			if(this.props.listenEvt.active != null)
				this.props.cxt.ee.removeListener(this.props.listenEvt.active,this.animationActive);
			if(this.props.listenEvt.deactive != null)
				this.props.cxt.ee.removeListener(this.props.listenEvt.deactive,this.animationDeactive);
		},
		render:function(){
			var className = (this.state.animationState == "start" ? this.props.className_Active + " " + this.props.animationClass:this.props.className_Deactive);
			return <div className={className} style={_assign(this.props.animation,this.props.normalStyle)}> <img src="http://www.sinaimg.cn/dy/slidenews/1_img/2016_20/2841_694171_482050.jpg"></img></div>
		}});
	return MePage;
});
