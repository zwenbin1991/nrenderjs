var React = require("react");
var ReactDOM = require("react-dom");
define("MePage",function(){
	var MePage  = React.createClass({
		render:function(){
			return <div className="me-page" style={this.props.style} >{this.props.children}</div>;
		}});
	return MePage;
});

