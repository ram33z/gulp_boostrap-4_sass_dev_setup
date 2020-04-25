const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile scss into css
gulp.task('sass', function() {
    return gulp.src(['scss/*.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

//copy js to dist
gulp.task('js', function() {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


//static server
gulp.task('serve',gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "/index.html"
         }
    });
    gulp.watch('scss/**/*.scss', gulp.parallel('sass')); // run sass compile on scss/style.scss change
    gulp.watch('dist/*.html').on('change',browserSync.reload); //reload on .html changes
    gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);  //reload on .js changes
}));

gulp.task('default', gulp.series('js','serve'));