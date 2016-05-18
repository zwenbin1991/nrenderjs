var React = require("react");
var ReactDOM = require("react-dom");
define("MeAnimation",function(){
	var MePage  = React.createClass({
		getDefaultProps:function(){
			return {
				className:"fadeIn animated",
				animation:{
					animationIterationCount:"1",
					animationDelay:"2.3s",
					animationDuration:"1s"
				}
			}
		},
		render:function(){
			return <span className={this.props.className} style={this.props.animation}> dfasdfasdfasdfasfd</span>
		}});
	return MePage;
});
