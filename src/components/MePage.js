var React = require("react");
var ReactDOM = require("react-dom");
define("MePage",function(){
	var MePage  = React.createClass({
		getInitialState:function(){
			return{
				active:false
			};
		},
		componentDidUpdate:function(prevProps,prevState){
			if(prevState.active != this.state.active){
				var pageActEvt = this.props.page_id + ":" + (this.state.active ? "active":"deactive");
				this.props.cxt.ee.emitEvent(pageActEvt,[{target:this,active:this.state.active}]);
				console.log("send out " + pageActEvt);
			}
		},
		render:function(){
			return <div className="me-page" id={this.props.page_id} style={this.props.normalStyle} >{this.props.children}</div>;
		}});
	return MePage;
});

