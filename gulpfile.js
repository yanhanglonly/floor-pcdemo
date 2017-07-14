var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCss = require("gulp-clean-css");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify =require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var inject= require("gulp-inject");
var connect = require("gulp-connect");

gulp.task("css",function(){
	gulp.src("resurce/sass/*.scss")
	.pipe(concat("all.scss"))
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(rename("all.min.css"))
	.pipe(gulp.dest("dest/css"))
	.pipe(connect.reload());
});
gulp.task("javascript",function(){
	gulp.src("resurce/js/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dest/js"))
	.pipe(connect.reload());
});
gulp.task("images",function(){
	gulp.src("resurce/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dest/images"))
	.pipe(connect.reload());
});
gulp.task("data",function(){
	gulp.src("resurce/data/*")
	.pipe(gulp.dest("dest/data"))
	.pipe(connect.reload());
});
gulp.task("html",function(){
	gulp.src("resurce/**/*.html")//选择
	.pipe(gulp.dest("dest/"))//输入
	.pipe(inject(gulp.src(["dest/css/*.css","dest/js/require.js"]),{relative:true}))
	.pipe(gulp.dest("dest/"))
	.pipe(connect.reload());
});//注入
gulp.task("server",function(){
	connect.server({
		root:"dest/",
		port:666,
		livereload:true
	});
});
gulp.task("watch",function(){
	gulp.watch(["resurce/**/*"],["css","javascript","images","data","html"]);
});
gulp.task("default",["css","javascript","images","data","html","server","watch"]);