var MePage = require("../dist/MePage.js");
var MeAnimation = require("../dist/MeAnimation.js");
var MeToolBar = require("../dist/MeToolBar.js");
var MeMusic = require("../dist/MeMusic.js")
var MeSwipeTrigger = require("../dist/MeSwipeTrigger");
var MeVPads = require("../dist/MeVPads.js");
var MeArticle = require("../src/me-article.js");
var EventEmitter = require("wolfy87-eventemitter");
var React = require("react");
var ReactDOM = require("react-dom");

function renderjs(){}
module.exports = {
	MePage:MePage,
	MeAnimation:MeAnimation,
	MeToolBar:MeToolBar,
	MeMusic:MeMusic,
	MeVPads:MeVPads,
	MeArticle:MeArticle,
	MeSwipeTrigger:MeSwipeTrigger,
	EventEmitter:EventEmitter,
	React:React,
	ReactDOM:ReactDOM
};