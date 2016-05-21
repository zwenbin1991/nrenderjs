define([],function(){
var Renderjs = renderjs;
var React = Renderjs.React;
var ReactDOM = Renderjs.ReactDOM;
var MePage = Renderjs.MePage;
var MeAnimation = Renderjs.MeAnimation;
var MeSwipeTrigger = Renderjs.MeSwipeTrigger;
var MeMusic = Renderjs.MeMusic;
var MeToolBar = Renderjs.MeToolBar;
var EventEmitter = Renderjs.EventEmitter;
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
			<MePage idx={0} cxt={cxt} page_id = "page1" ref={registerPage} normalStyle={{backgroundImage:'url("http://ac-hf3jpeco.clouddn.com/d7f15555aa1d6e94e93f?imageView2/2/w/1128/h/800")'}}>
				<MeSwipeTrigger cxt={cxt} listenEvt={{active:"page1:active",triggerEvt:"swiperight"}} evtName="xxxxx" normalStyle={{position:"absolute",top:"70px",left:"0px",height:"400px",width:"300px"}}>
					<MeAnimation cxt={cxt} listenEvt={{active:"xxxxx",deactive:"page1:deactive"}} normalStyle={{top:"200px"}} animation={{
						animationIterationCount:"1",
						animationDelay:"0s",
						animationDuration:"1s"
					}}
					animationClass="fadeInLeft">
					<img src="http://www.sinaimg.cn/dy/slidenews/1_img/2016_20/2841_694171_482050.jpg"></img>
					</MeAnimation>
				</MeSwipeTrigger>
			</MePage>,
			<MePage idx={1} cxt={cxt} page_id = "page2" ref={registerPage} id ={1} normalStyle={{backgroundColor:"white",backgroundImage:'url("http://ac-hf3jpeco.clouddn.com/3225b3517d091debcc12?imageView2/2/w/640/h/853")'}}>
				<MeAnimation cxt={cxt} listenEvt={{active:"page2:active",deactive:"page2:deactive"}} normalStyle={{top:"200px"}} animationClass="fadeInUp">
				<div style={{fontSize:"46px",fontFamily:"css-font-111"}}>2015年7月25日<p>夏天，很热打扫我们</p><p>即将要开始新生活的住所</p></div>
				</MeAnimation>
			</MePage>,
			<MePage idx={2} cxt={cxt} page_id = "page4" ref={registerPage} normalStyle= {{backgroundColor:"gray",backgroundImage:'url("http://ac-hf3jpeco.clouddn.com/312ab77435c7d2b06bad.jpg?imageView2/2/format/jpg/w/600/h/800")'}}></MePage>,
			<MePage idx={3} cxt={cxt} page_id = "page3" ref={registerPage} normalStyle={{backgroundColor:"pink",backgroundImage:'url("http://ac-hf3jpeco.clouddn.com/3c2d462ae56458d68746.jpg")'}}>
				<MeAnimation cxt={cxt} listenEvt={{active:"page3:active",deactive:"page3:deactive"}} normalStyle={{top:"20px",height:"100px"}}><div>Hello the animation</div></MeAnimation>
			</MePage>],
		"toolBar":
			<MeToolBar>
				<MeMusic id="magazine-music" src="http://ac-hf3jpeco.clouddn.com/154478292068657d.mp3"></MeMusic>
			</MeToolBar>,
		"num_of_page":4,
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


