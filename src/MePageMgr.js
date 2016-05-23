define("MePageMgr",function(){
	var MePageMgr = function(pageSize){
		this.pageArr = new Array(pageSize);//ҳ�����������page��react����
	};
	MePageMgr.prototype.registerPage = function(pageInstance){
		if(pageInstance != null){//todo . check �����Ƿ�Ϊreact class
			var idx = pageInstance.props.idx;
			if(idx < this.pageArr.length){//Page�Ķ�����ܻᱻ���´���(��Ϊrender)�����д��ڸ���,����ǲ����ظ�����
				if((this.pageArr[idx] != null || this.pageArr[idx] != undefined) && (this.pageArr[idx] != pageInstance)) console.log("warning a new page instance replaced");
				this.pageArr[idx] = pageInstance;
			}
		}
	};
	MePageMgr.prototype.addPageListener = function(idx,comRef){
		if(idx < this.pageArr.length && this.pageArr[idx] != null){
			this.pageArr[idx].addListener(comRef);
		}
	};
	MePageMgr.prototype.removePageListener = function(id,comRef){
		if(idx < this.pageArr.length && this.pageArr[idx] != null){
			this.pageArr[idx].removeListener(comRef);
		}
	};
	MePageMgr.prototype.getPageInstance = function(idx){
		if(idx < this.pageArr.length) return this.pageArr[idx];
		return null;
	};
	return MePageMgr;
});