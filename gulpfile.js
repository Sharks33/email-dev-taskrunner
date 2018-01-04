/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const inlineCss = require('gulp-inline-css');
const htmlmin = require('gulp-htmlmin');
const litmus = require('gulp-litmus');
const htmlhint = require("gulp-htmlhint");
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// --TOP LEVEL FUNCTIONS--
// gulp.task - Define tasks
// gulp.src - Points to files to use
// gulp.dest - Points to folder to output
// gulp.watch - Watch files and folders for changes
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// LOGS MESSAGE
gulp.task('message', function(){
	return console.log('Gulp is running...');
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// COPY ALL HTML FILES TO PRODUCTION
gulp.task('cphtml', function(){
	gulp.src('src/*.html').pipe(gulp.dest('production'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// OPTOMIZE IMAGES AND COPY TO PRODUCTION
gulp.task('imagemin', () =>
	gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('production/images'))
);
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// OPTOMIZE JS AND COPY TO PRODUCTION
gulp.task('jsmin', function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('production/js'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// COMPILE SASS
gulp.task('sass', function(){
	gulp.src('src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('production/css'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// INLINE CSS
gulp.task('inline', function() {
    return gulp.src('src/*.html')
        .pipe(inlineCss({
        	applyStyleTags: true,
        	applyLinkTags: true,
        	removeStyleTags: true,
        	removeLinkTags: true
        }))
        .pipe(gulp.dest('production'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// MINIFY HTML
gulp.task('htmlmin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('production'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// DEFAULT RUN ALL TASKS
gulp.task('default', ['message', 'cphtml', 'imagemin', 'jsmin', 'sass']);
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// SEND TEST EMAILS TO LITMUS
var config = {
    username: "ps.emaildev@gmail.com",
    password: "Pierry@1234",
    url: "https://ctracunlimited.litmus.com",
    applications: [
        'iphone7',
        // ADD CLIENTS AS NEEDED
    ]
}

gulp.task('litmus', function () {
    return gulp.src('src/*.html')
        .pipe(litmus(config))
        .pipe(gulp.dest('production'));
});
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
gulp.task('build-css', function() {
       return gulp.src('assets/less/*.less')
            .pipe(plugins.plumber())
            .pipe(plugins.less())
            .on('error', function (err) {
                gutil.log(err);
                this.emit('end');
            })
            // .pipe(plugins.cssmin())
            .pipe(plugins.autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
            .pipe(gulp.dest('build')).on('error', gutil.log)
            .pipe(plugins.livereload());
    });
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// WATCH ALL TASKS
// gulp.task('watch', function() {
// 	gulp.watch('src/js/*.js', ['jsmin']);
// 	gulp.watch('src/images/*', ['imagemin']);
// 	gulp.watch('src/html/*.html', ['cphtml']);
// 	gulp.watch('src/scss/*.scss', ['sass']);
// });
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// EOF //
/////////////////////////////////////////////////////////////////////////

