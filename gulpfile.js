var project = "app"
var gulp = require('gulp');
var express = require('express');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();

!function(){
	var argvs=process.argv;
	var _p=argvs.find(function(a){
		return /^--\$/.test(a);
	})

	if(_p){
		project=_p.slice(3)
	}

}()


gulp.task('lr', function() {
	bs.init({
		 server: {
            baseDir: project
        }
	});
	gulp.watch(project + '/sass/*.scss', ['styles']);
	gulp.watch(project + '/*.html', bs.reload);
	gulp.watch(project + '/js/*.js',bs.reload);
})

gulp.task('styles', function() {
	return gulp.src(project + '/sass/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(project + '/css/'))
		.pipe(bs.stream({once: true}))
});

gulp.task('imagemin', function() {
	return gulp.src(project + '/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}, {
				cleanupIDs: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(project + '/images'));
})




gulp.task('default', ['lr', 'styles'], function() {

})