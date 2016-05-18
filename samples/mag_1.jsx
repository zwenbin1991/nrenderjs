var React = require("react");
var ReactDOM = require("react-dom");
var MePage = require("../dist/MePage.js");
var MeAnimation = require("../dist/MeAnimation.js");
define("mag_1",[],function(){
	return {
		"front-page":<MePage id="front-page" style={{}}>
			<MeAnimation><div>First Page</div></MeAnimation></MePage>,
		"index":[<MePage id="index" style={{}}></MePage>],
		"pages":[<MePage id ={1} style={{}}></MePage>,<MePage id = {2} style= {{}}></MePage>,<MePage id = {3} style={{}}><MeAnimation><div>Hello world</div></MeAnimation></MePage>],
		"num_of_page":1 + 1 + 3,
		"reading_page_index":["front-page","index",0,1,2]
	};
});