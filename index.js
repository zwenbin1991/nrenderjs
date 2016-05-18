var MeVPads = require("../dist/MeVPads.js");
var MeArticle = require("../src/me-article.js");
var Mag_1 = require("../dist/mag_1.js");
var React = require("react");
var ReactDOM = require("react-dom");
var _article = new MeArticle(Mag_1);
ReactDOM.render((<MeVPads buffer_len={5} article= {_article}></MeVPads>),document.getElementById("example1"));