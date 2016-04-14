/*
 * Gulpfile
 */

// Load plugins
var gulp         = require('gulp');
var less         = require('gulp-less');
var gcmq         = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var rename       = require('gulp-rename');

// Paths
var srcPath = 'src';
var distPath = 'dist';
var paths = {
    templates: srcPath + '/templates',
    styles: srcPath + '/styles',
    images: srcPath + '/images'
};

// Templates
gulp.task('templates', function() {
    return gulp.src(paths.templates + '/**/*')
        .pipe(gulp.dest(distPath));
});

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.styles + '/*.less')
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(distPath + '/css'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(distPath + '/css'));
});

// Images
gulp.task('images', function() {
    return gulp.src(paths.images + '/**/*')
        .pipe(gulp.dest(distPath + '/images'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(paths.templates + '/**/*', ['templates']);
    gulp.watch(paths.styles + '/**/*.less', ['styles']);
    gulp.watch(paths.images + '/**/*', ['images']);
});

// Build: one shot
gulp.task('build', ['templates', 'styles', 'images']);

// Default
gulp.task('default', ['watch', 'build']);
