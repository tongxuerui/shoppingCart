var gulp = require('gulp');
var connect = require('gulp-connect');


var jsSrc = 'js/**/*.js';
var htmlSrc = '**/*.html';
var htmlDist = 'dist';


//定义名为js的任务
gulp.task('js', function() {
    gulp.src(jsSrc)
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest(jsDist))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        // .pipe(gulp.dest(jsDist))
        .pipe(connect.reload())
});

//定义html任务
gulp.task('html', function() {
    gulp.src(htmlSrc)
        //.pipe(gulp.dest(htmlDist))
        .pipe(connect.reload());
});
//定义livereload任务
gulp.task('connect', function() {
    connect.server({
         port: 8080,
        livereload: true
    });
});


//定义看守任务
gulp.task('watch', function() {
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(jsSrc, ['js']);

});

// 默认执行gulp命令
gulp.task('default', function() {
    console.log('>>>Gulp is ready.<<<');
});
//定义默认任务
gulp.task('sport', ['watch', 'connect']);