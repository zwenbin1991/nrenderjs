define("MeArtical",[],function(){
	var MeArticle = function(art){
		this.article = art;
	};
	
	MeArticle.prototype.getNbrPageIdx = function(dir,idx,idy){
		if(idy == undefined){
		//一维结构，二维结构稍后
			var innerIdx = idx + 1;		//layout数组比较特殊
			if(innerIdx <= 0 || innerIdx >= this.article.layout.length) return -1;//超出边界
			if(dir === "right")
				return this.article.layout[innerIdx+1];
			if(dir === "left")
				return this.article.layout[innerIdx-1];
		}
		return -1;
	};
	MeArticle.prototype.getCurPage = function(){
		return this.getPage(this.article.reading_page_index[this.reading_point]);
	};
	
	MeArticle.prototype.getPageByIdx = function(idx){
		if(idx < 0 || idx >= this.article.pages.length) return null;
		return this.article.pages[idx];
	};
	MeArticle.prototype.getPageInstanceByIdx = function(idx){
		return this.article.cxt.pageMgr.getPageInstance(idx);
	};
	MeArticle.prototype.getPage = function(key){
		var page = null;
		if(typeof key === "number"){
			page = this.article.pages[key];
		}
		if(typeof key === "string"){
			var keys = key.split(":");
			if(keys.length == 1){
				page = this.article[key];
			}else{
				page = this.article[keys[0]][keys[1]];
			}
		}
		return page;
	};
	MeArticle.prototype.getNumOfPage = function(){
		return this.article.pages.length;
	};
	MeArticle.prototype.getCxt = function(){
		return this.article.cxt;
	}
	MeArticle.prototype.getToolBar = function(){
		return this.article.toolBar;
	}
	return MeArticle;
});