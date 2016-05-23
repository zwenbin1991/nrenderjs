var gulp = require('gulp');
//var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var fs = require("fs");
var each = require("gulp-foreach");
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var rename = require("gulp-rename");

var dest_dir = "dist";
var obfuscate_tag = true;
var zip_tag = true;
var source_set = null;
jsx = ["src/MeVPads.js",
	"src/components/MePage.js",
	"src/components/MeAnimation.js",
	"src/components/MeTouchTrigger.js",
	"src/components/MeToolBar.js",
	"src/components/MeMusic.js",
	"src/components/MeInteractImage.js",
	"samples/mag_1.jsx",
	"index.js"
];
gulp.task("babel", function(){
    return gulp.src(jsx).
        pipe(babel({
            plugins: ['transform-react-jsx']
        })).
        pipe(gulp.dest("dist"));
});

gulp.task("pack",["babel"],function(){
	return gulp.src("dist/index.js")
	.pipe(webpack(require("./webpack.config.js")))
	.pipe(gulp.dest("lib"));
});

gulp.task("default",["pack"]);