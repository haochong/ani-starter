var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');

gulp.task('clean', function () {
    return del([
        './dist/**/*'
    ]);
});

gulp.task('css_core', function () {
    return gulp.src('./src/css/core/core.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js_core', function() {
    var jsArray = [
        './src/js/core/ani-log.js',
        './src/js/core/ani-pubsub.js',
        './src/js/core/ani-require.js',
        './src/js/core/ani-dom.js',
        './src/js/core/ani-evt.js',
        './src/js/core/ajax.js',
        './node_modules/mustache/mustache.min.js',
        './node_modules/page/page.js'
    ];

    return gulp.src(jsArray)
        .pipe(concat('core.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js_core_dev', function() {
    var jsArray = [
        './src/js/core/ani-log.js',
        './src/js/core/ani-pubsub.js',
        './src/js/core/ani-require.js',
        './src/js/core/ani-dom.js',
        './src/js/core/ani-evt.js',
        './src/js/dev/mock.js',
        './src/js/core/ajax.js',
        './node_modules/mustache/mustache.min.js',
        './node_modules/page/page.js'
    ];

    return gulp.src(jsArray)
        .pipe(concat('core_dev.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function () {
    gulp.watch('./src/js/core/**/*.js', ['js_core', 'js_core_dev']);
    gulp.watch('./src/css/core/**/*.styl', ['css_core']);
});

gulp.task('build', ['clean'], function () {
    gulp.start('js_core');
    gulp.start('js_core_dev');
    gulp.start('css_core');
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});

