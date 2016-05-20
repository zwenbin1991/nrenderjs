define("mag_1",[],function(){
var React = require("react");
var ReactDOM = require("react-dom");
var MePage = require("../dist/MePage.js");
var MeAnimation = require("../dist/MeAnimation.js");
var MeSwipeTrigger = require("../dist/MeSwipeTrigger.js");
var EventEmitter = require("wolfy87-eventemitter");
var ee = new EventEmitter();
	var cxt = {
		ee:				ee,	//作品范围的事件订阅器
		interactHandler:	null		//由外部容器设置，方便组件能够处理交互事件
	}
	var react_page_instances = [null,null,null,null,null];
	function registerPage(ref){
		react_page_instances[ref.props.idx] = ref;
	}
	return {
		"pages":[
			<MePage idx={0} cxt={cxt} page_id = "page1" ref={registerPage} ee={ee} style={{}}>
				<MeSwipeTrigger cxt={cxt} listenEvt={{active:"page1:active",triggerEvt:"swiperight"}} evtName="xxxxx" normalStyle={{position:"absolute",top:"70px",left:"0px",height:"400px",width:"300px"}}>
					<MeAnimation cxt={cxt} ee={ee}  listenEvt={{active:"xxxxx",deactive:"page1:deactive"}} normalStyle={{top:"200px"}} animation={{
						animationIterationCount:"1",
						animationDelay:"0s",
						animationDuration:"1s"
					}}
					animationClass="fadeInLeft">
					</MeAnimation>
				</MeSwipeTrigger>
			</MePage>,
			<MePage idx={1} cxt={cxt} page_id = {1} ee={ee} ref={registerPage} id ={1} style={{}}></MePage>,
			<MePage idx={1} cxt={cxt} page_id = {2} ee={ee} ref={registerPage} style= {{}}></MePage>,
			<MePage idx={1} cxt={cxt} page_id = {3} ee={ee} ref={registerPage} style={{}}>
				<MeAnimation cxt={cxt} ee={ee} page_id={3} normalStyle={{top:"20px",height:"100px"}}><div>Hello the animation</div></MeAnimation>
			</MePage>],
		"num_of_page":1 + 1 + 3,
		"index":{
			"front_page":0,
			"index":1,
			"1":2,
			"2":3,
			"2":4,
		},
		"react_page_instances":react_page_instances,
		"cxt":cxt
	};
});