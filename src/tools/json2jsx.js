var _ = require("underscore");
var file = require("../../samples/154daa26719d3dce.js");
var pages = file.tplData.pages;
var MePageT = _.template("<MePage idx={<%= idx %>}></MePage>");
var MeAnimationT = _.template("");

console.log("test",MePageT);
for(i = 0;i < pages.length;i ++){
	pages[i].idx = i;
	renderPage(pages[i]);
}

function renderPage(page){
	console.log(MePageT(page));
}