var gulp = require("gulp");
var webpack = require("gulp-webpack");
var watch = require("gulp-watch");
var http = require("http");
var st = require("st");
var livereload = require("gulp-livereload");
var path = require("path");
var Karma = require("karma").Server;
var awspublish = require("gulp-awspublish");

gulp.task("html", function() {
  return gulp.src("src/**/*.html")
  .pipe(gulp.dest("dist"))
  .pipe(livereload());
});

gulp.task("webpack", function() {
  return webpack(require("./webpack.config.js"))
  .pipe(gulp.dest("dist/"))
  .pipe(livereload());
});

gulp.task("server", function(done) {
  http.createServer(
    st({ path: path.join(__dirname, "/dist"), index: "index.html", cache: false })
  ).listen(3010, done);
});

gulp.task("publish", function() {
  var publisher = awspublish.create({
    region: "ap-southeast-2",
    params: {
      Bucket: "eroad.benlyn.ch"
    }
  });
  var headers = {
    "Cache-Control": "max-age=0, no-transform, public"
  };
  return gulp.src("./dist/**/*")
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task("watch", [ "server" ], function(done) {
  livereload.listen({ basePath: "dist" });
  gulp.watch("src/**/*.jsx", [ "webpack" ]);
  gulp.watch("src/**/*.js", [ "webpack" ]);
  gulp.watch("src/**/*.jsx", [ "webpack" ]);
  gulp.watch("src/**/*.css", [ "webpack" ]);
  gulp.watch("src/**/*.html", [ "html" ]);
  new Karma({
    configFile: __dirname + "/karma.conf.js",
    singleRun: false,
    autoWatch: true,
    browsers: [ "PhantomJS" ]
  }, done).start();
});

gulp.task("default", ["html", "webpack"], function() {
  gulp.start("watch");
});
