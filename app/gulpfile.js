const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const { spawn } = require('child_process');

gulp.task('default', ['test', 'lint', 'retire'], () => {
});

gulp.task('test:watch', () => {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('test', () => gulp.src(['test/**/*.js'], { read: false })
  .pipe(mocha({ options: '--exit', reporter: 'list' }))
  .on('error', gutil.log));

gulp.task('lint:watch', () => {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['lint']);
});

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('retire:watch', ['retire'], () => {
  gulp.watch(['src/**/*.js', 'package.json'], ['retire']);
});

gulp.task('retire', () => {
  const child = spawn('node_modules/.bin/retire', ['-n', '-p'], {
    cwd: process.cwd(),
  });
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    gutil.log(data);
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
    gutil.log(gutil.colors.red(data));
    gutil.beep();
  });
});
