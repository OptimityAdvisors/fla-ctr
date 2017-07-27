var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');

gulp.task('copy-html', function() {
    return gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('src/*.css')
    .pipe(cleanCSS())
    //TODO: update references to .min in "dist" HTML
    // https://www.npmjs.com/package/gulp-html-replace
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-js', function () {
    gulp.src('./src/*.js') 
    .pipe(uglify())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['minify-js']);
  gulp.watch('./src/*.css', ['minify-css']);
  gulp.watch('./src/*.html', ['copy-html']);
});