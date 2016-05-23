define("MeToolBar",function(){
var React = require("react");
var ReactDOM = require("react-dom");
var MeToolBar = React.createClass({
	
	render:function(){
		return <div className="toolbar">{this.props.children}</div>;
	}
});
return MeToolBar;
});