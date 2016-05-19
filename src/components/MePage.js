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
				var pageActEvt = "page-" + this.props.page_id + ":active_change"
				console.log("page ",this.props.page_id," become active and set out " + pageActEvt);
				this.props.ee.emitEvent("page-" + this.props.page_id + ":active_change",[{target:this,active:this.state.active}]);
			}
		},
		render:function(){
			return <div className="me-page" style={this.props.style} >{this.props.children}</div>;
		}});
	return MePage;
});

