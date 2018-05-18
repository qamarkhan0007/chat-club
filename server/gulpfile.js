const gulp = require('gulp');
const ts = require('gulp-typescript');
// const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
	const tsResult = tsProject.src()
    .pipe(tsProject());
	return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
	gulp.watch('controller.js', ['scripts']);
	gulp.watch('model.js', ['scripts']);
	gulp.watch('server.js', ['scripts']);
	gulp.watch('router.js', ['scripts']);
});

// gulp.task('assets', function() {
// 	return gulp.src(JSON_FILES)
//     .pipe(gulp.dest('dist'));
// });

gulp.task('default', ['watch']);
