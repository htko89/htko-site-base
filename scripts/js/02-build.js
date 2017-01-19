// use strict code
"use strict";

// global node modules
var gulp = require("gulp");
var path = require("path");
var fs = require("fs-extra");
var cp = require("child_process");
var gutil = require("gulp-util");
var prettify = require("gulp-jsbeautifier");

// hugo function
function hugo(conf, callback) {
  fs.removeSync(conf.hugo.public);
  console.log()
  return cp.spawn("hugo", ["-s", conf.root.hugo, "-b", conf.hugo.url], {
      stdio: "inherit"
    })
    .on("error", (error) => gutil.log(gutil.colors.red("[Hugo]" + error.message)))
    .on("close", callback);
}

// lint function
function lint(conf) {
  return gulp.src(path.join(conf.hugo.public, "/**/*.html"))
    .pipe(prettify({
      indent_size: 2,
      preserve_newlines: false
    }))
    .pipe(gulp.dest(conf.hugo.public));
}

// exports
module.exports.hugo = hugo;
module.exports.lint = lint;