var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
// var babel = require('babelify');
var browserSync = require('browser-sync').create()

function compile(watch) {

  // var bundler = watchify(browserify('./src/index.js', {debug: true, standalone: 'MIModel'}).transform(babel));
  var bundler = watchify(browserify('./src/index.js', {debug: true, standalone: 'MIModel'}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('mi-model.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'))
      .pipe(browserSync.stream({once: true}));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build-watch', ['build'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});



gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', 'browser-sync']);
