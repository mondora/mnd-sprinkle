var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();
var tinyLr	= require("tiny-lr");
var static	= require("node-static");
var http	= require("http");

var lrServer = tinyLr();
var dvServer = http.createServer(function (req, res) {
	var stServer = new static.Server("./demo", {cache: false});
	req.on("end", function () {
		stServer.serve(req, res);
	});
	req.resume();
});

gulp.task("styles", function () {
	gulp.src("styles/sprinkle.scss")
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer("last 2 version"))
		.pipe(plugins.rename("sprinkle.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("sprinkle.min.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("scripts", function () {
	gulp.src("scripts/sprinkle.js")
		.pipe(plugins.ngmin())
		.pipe(gulp.dest("dist/"));
});

gulp.task("templates", function () {
	gulp.src("templates/**/*.html")
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd.sprinkle",
			prefix: "templates/"
		}))
		.pipe(plugins.concat("sprinkle.template-cache.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("final", function () {
	gulp.src(["dist/sprinkle.js", "dist/sprinkle.template-cache.js"])
		.pipe(plugins.concat("sprinkle-tpls.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("sprinkle-tpls.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("default", function () {
	dvServer.listen(8080);
	lrServer.listen(35729);
	gulp.watch("styles/sprinkle.scss", ["styles"]);
	gulp.watch("scripts/sprinkle.js", ["scripts"]);
	gulp.watch("templates/**/*.html", ["templates"]);
	gulp.watch(["dist/sprinkle.template-cache.js", "dist/sprinkle.js"], ["final"]);
});
