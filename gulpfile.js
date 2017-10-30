var gulp = require('gulp');
var pug = require('gulp-pug');

var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var src = {
  'html': ['src/**/*.pug', '!src/**/_*.pug'],
  'html_watch': ['src/**/*.pug'],
  'css': ['src/sass/**/*.sass']
};

var dest = {
  'html': './dest/',
  'css': './dest/css'
};

gulp.task('html', function() {
  return gulp.src(src.html)
    .pipe(pug({
      pretty: true,
      basedir: 'src'
    }))
    .pipe(gulp.dest(dest.html))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
  return gulp.src(src.css)
    .pipe(sass({
      outputStyle: 'expanded',
      basedir: 'src'
    }))
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: dest.html
    },
    ghostMode: true,
    open: 'local',
    notify: false
  });
});
gulp.task('watch', function(){
  gulp.watch(src.html_watch, ['html']);
  gulp.watch(src.css, ['css']);
});

gulp.task('default', [], function() {
  runSequence(
    'watch',
    'browser-sync'
  )
});
