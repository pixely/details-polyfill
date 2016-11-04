const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const webpackConfig = require('./webpack.config');

gulp.task('script', (done) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err));
    } else {
      gutil.log(stats.toString());
    }
    done();
  });
});

gulp.task('lint', () => {
  gulp.src(['**/*.js', '!node_modules/**', '!dist/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint', 'script']);
