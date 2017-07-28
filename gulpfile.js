var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');

gulp.task('copy-html', function() {
    return gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
    return gulp.src('src/*.css')
      .pipe(cleanCSS())      
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('minify-js', function () {
    return gulp.src('./src/*.js') 
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('release-html', function() {
  gulp.src('./src/index.html')
    .pipe(htmlreplace({
        'css': 'florida.min.css',
        'js': 'florida.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

// "watch" is probably more realistic for SASS / LESS compilation, rather
// than minifying with every save
gulp.task('watch', function () {
    gulp.watch('./src/*.js', ['minify-js']);
    gulp.watch('./src/*.css', ['minify-css']);
    //gulp.watch('./src/*.html', ['copy-html']);
    gulp.watch('./src/*.html', ['release-html']);
});

gulp.task('build', function() {
  //TODO: how to execute multiple tasks outside of a "watch"?
  // This might involve dependencies, as by default the tasks will run async
});