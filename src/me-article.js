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
		return this.getPage(this.article.reading_page_index[idx]);
	}
	
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
	
	return MeArticle;
});