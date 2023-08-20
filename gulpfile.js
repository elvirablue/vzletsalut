let gulp     = require('gulp'),
	browserSync  = require('browser-sync').create(),
	sass         = require('gulp-sass')(require('sass')),
	prefixer = require('gulp-autoprefixer'),
	cssmin     = require('gulp-clean-css'),
	uglify       = require('gulp-uglify'),
	fileinclude = require('gulp-file-include'),
	gcmq = require('gulp-group-css-media-queries'),
    svgSprite = require('gulp-svg-sprite');

gulp.task('html_build', function (done) {
	gulp.src('src/*.html')
		.pipe(fileinclude())
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.stream());
	done();
});

gulp.task('css_build', function (done) {
	gulp.src('src/assets/*.scss')
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gcmq())
		//.pipe(cssmin())
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.stream());
	done();
});

gulp.task('js_build', function (done) {
	gulp.src('src/assets/script.js')
		.pipe(fileinclude())
		.pipe(uglify())
		.pipe(gulp.dest('build/js/'))
		.pipe(browserSync.stream());
	done();
});

gulp.task('fonts_build', function (done) {
    gulp.src('src/assets/fonts/*.*')
            .pipe(gulp.dest('build/fonts/'))
            .pipe(browserSync.stream());
    done();
});

gulp.task('image_build', function (done) {
	gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('build/img/'))
		.pipe(browserSync.stream());
	done();
});

gulp.task('svg_sprite_build', function(done){
    const config = {
        mode: {
            stack: {
                sprite: "../sprite.svg"  //sprite file name
            }
        }
    };
    gulp.src("src/assets/svg/*.*")
            .pipe(svgSprite(config))
            .pipe(gulp.dest('build/img/'))
            .pipe(browserSync.stream());
        done();
});

gulp.task('webServer', function(done) {
	browserSync.init({
		server: "build/"
	});
	gulp.watch('src/**/*.html', gulp.series('html_build'));
	gulp.watch('src/**/*.scss', gulp.series('css_build'));
	gulp.watch('src/**/*.js', gulp.series('js_build'));
    gulp.watch('src/assets/fonts/*.*', gulp.series('fonts_build'));
	gulp.watch('src/img/**/*.*', gulp.series('image_build'));
	gulp.watch('src/assets/svg/*.*', gulp.series('svg_sprite_build'));
	done();
});

gulp.task('default', gulp.series('html_build', 'css_build', 'js_build', 'image_build', 'svg_sprite_build', 'fonts_build', 'webServer'));
