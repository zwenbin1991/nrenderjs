define("mag_1",[],function(){
var React = require("react");
var ReactDOM = require("react-dom");
var MePage = require("../dist/MePage.js");
var MeAnimation = require("../dist/MeAnimation.js");
var MeSwipeTrigger = require("../dist/MeSwipeTrigger.js");
var EventEmitter = require("wolfy87-eventemitter");
var ee = new EventEmitter();

	var react_page_instances = [null,null,null,null,null];
	function registerPage(ref){
		react_page_instances[ref.props.page_id] = ref;
	}
	return {
		"pages":[
			<MePage page_id = {0} ref={registerPage} ee={ee} style={{}}>
				<MeAnimation page_id={0} ee={ee}><div>New Article</div></MeAnimation>
				<MeSwipeTrigger style={{position:"absolute",top:"70px",left:"0px",height:"100px",width:"300px"}}></MeSwipeTrigger>
			</MePage>,
			<MePage page_id = {1} ee={ee} ref={registerPage} id ={1} style={{}}></MePage>,
			<MePage page_id = {2} ee={ee} ref={registerPage} style= {{}}></MePage>,
			<MePage page_id = {3} ee={ee} ref={registerPage} style={{}}>
				<MeAnimation ee={ee} page_id={3}><div>Hello world</div></MeAnimation>
			</MePage>],
		"num_of_page":1 + 1 + 3,
		"index":{
			"front_page":0,
			"index":1,
			"1":2,
			"2":3,
			"2":4,
		},
		"react_page_instances":react_page_instances
	};
});