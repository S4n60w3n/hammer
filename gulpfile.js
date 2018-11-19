const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const tsProject = ts.createProject('tsconfig.json');

const DEST = 'build/';

gulp.task('default', ['clean'], () => {
	gulp.src('README.md').pipe(gulp.dest(DEST));
	return gulp.src('package.json').pipe(gulp.dest(DEST));
});

gulp.task('build', () => {
	return gulp.src(['src/**/*.ts', '!src/**/*.spec.ts'])
		.pipe(tsProject())
		.pipe(gulp.dest(DEST));
});

gulp.task('clean', () => {
	return gulp.src(DEST, { read: false }).pipe(clean());
});
