define("me-article",[],function(){
	var MeArticle = function(art){
		this.article = art;
		this.reading_point = 0;
	};
	
	MeArticle.prototype.readNextPage = function(){
		if(this.reading_point >= this.article.reading_page_index.length - 1){
			return null;
		}
		this.reading_point ++;
		return this.getCurPage(this.article.reading_page_index[this.reading_point]);
	};
	
	MeArticle.prototype.readPrevPage = function(){
		if(this.reading_point <= 0){
			return null;
		}
		this.reading_point --;
		return this.getCurPage();
	};
	
	MeArticle.prototype.getCurPage = function(){
		return this.getPage(this.article.reading_page_index[this.reading_point]);
	};
	
	MeArticle.prototype.getPageByIdx = function(idx){
		if(idx < 0 || idx >= this.article.pages.length) return null;
		return this.article.pages[idx];
	};
	MeArticle.prototype.getPageInstanceByIdx = function(idx){
		if(idx < 0 || idx >= this.article.pages.length) return null;
		if(this.article.react_page_instances[idx] != undefined) return this.article.react_page_instances[idx];
		else return null;
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
	MeArticle.prototype.renderPage = function(key,container){
		var page = this.getPage();
		if(page != null)
			ReactDOM.createElement(page,container);
	}
	MeArticle.prototype.getNumOfPage = function(){
		return this.article.num_of_page;
	}
	MeArticle.prototype.getCxt = function(){
		return this.article.cxt;
	}
	MeArticle.prototype.getToolBar = function(){
		return this.article.toolBar;
	}
	return MeArticle;
});