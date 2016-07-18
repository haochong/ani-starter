var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
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
        './src/js/core/log.js',
        './src/js/core/pubsub.js',
        './src/js/core/require.js',
        './src/js/core/dom.js',
        './src/js/core/evt.js',
        './src/js/core/ajax.js',
        './node_modules/mustache/mustache.min.js',
        './node_modules/page/page.js',
        './src/js/core/router.js',
        './src/js/core/ready.js'
    ];

    return gulp.src(jsArray)
        .pipe(uglify())
        .pipe(concat('core.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js_core_dev', function() {
    var jsArray = [
        './src/js/core/log.js',
        './src/js/core/pubsub.js',
        './src/js/core/require.js',
        './src/js/core/dom.js',
        './src/js/core/evt.js',
        './src/js/dev/mock.js',
        './src/js/core/ajax.js',
        './node_modules/mustache/mustache.min.js',
        './node_modules/page/page.js',
        './src/js/core/router.js',
        './src/js/core/ready.js'
    ];

    return gulp.src(jsArray)
        .pipe(concat('core_dev.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('js_plugin', function() {
    var jsArray = [
        './node_modules/blazy/blazy.min.js',
        './src/js/plugin/blazy_init.js'
    ];

    return gulp.src(jsArray)
        .pipe(concat('plugin.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function () {
    gulp.watch('./src/js/core/**/*.js', ['js_core', 'js_core_dev']);
    gulp.watch('./src/css/core/**/*.styl', ['css_core']);
});

gulp.task('build', ['clean'], function () {
    gulp.start('js_core');
    gulp.start('js_core_dev');
    gulp.start('js_plugin');
    gulp.start('css_core');
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});

