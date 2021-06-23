const gulp = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const groupCssMediaQueries = require('gulp-group-css-media-queries')

// Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  })
}

//Очистка директории
const clear = done => {
  del.sync('./public')
  done()
}

//HTML
const html = () => {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
}

//SASS
const scss = () => {
  return gulp
    .src('./src/sass/*.{sass,scss}')
    .pipe(
      sass({
        includePaths: ['node_modules/bootstrap/scss'],
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
}

// Отслеживание
const watch = () => {
  gulp.watch('./src/*.html', html)
  gulp.watch('./src/sass/**/*.{sass,scss}', scss)
}

exports.default = gulp.series(
  clear,
  gulp.parallel(html, scss),
  gulp.parallel(watch, server)
)
