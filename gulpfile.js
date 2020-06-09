const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

const config = {
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 3333,
    tunnel: false
};

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('lib.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js/'))
      .pipe(browserSync.stream());
});

gulp.task('cleanBuild', function () {
  return del(['build/*']);
});

gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('lib.css'))
            .pipe(autoprefixer({
                overrideBrowserslist: ['> 0.1%'],
                cascade: false
            }))
            .pipe(gulp.dest('build/css/'))
            .pipe(browserSync.stream());
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('build/img/'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts/'));
});

gulp.task('watch', function () {

    browserSync.init(config);

    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/plugins/*.js', gulp.series('scripts'));
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/img/**/*.*', gulp.series('img'));
});

gulp.task('build',
    gulp.series(
        'cleanBuild',
        gulp.parallel('html', 'scripts', 'scss', 'fonts', 'img'))
    );

gulp.task('default', gulp.series('build', 'watch'));