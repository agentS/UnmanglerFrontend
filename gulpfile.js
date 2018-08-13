const gulp = require("gulp");
const uglify = require("gulp-uglify");
const pump = require("pump");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");
const inject = require("gulp-inject");
const copy = require("gulp-copy");

gulp.task("uglifyJS", function(callback)
{
	pump
	(
		[
			gulp.src("src/js/*.js"),
			uglify(),
			gulp.dest("release/js/")
		],
		callback
	);
});

gulp.task("uglifyCSS", function()
{
	return gulp.src("src/css/*.css")
		.pipe(cleanCSS())
		.pipe(concat("styles.css"))
		.pipe(gulp.dest("release/css/"));
});

gulp.task("copyFonts", function()
{
	return gulp.src("src/css/font/*.woff2")
		.pipe(copy("release/css/font", { prefix: 3 }))
		.pipe(gulp.dest("release/css/font"))
});

gulp.task("uglifyHTML", function()
{
	const target = gulp.src("src/index.html");
	const sources = gulp.src("release/css/*.css", { read: false });

	return target.pipe(inject(sources, { ignorePath: [ "release/" ], addRootSlash: false }))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest("release"));
});

gulp.task("default", function()
{
	gulp.run("uglifyJS", "uglifyCSS", "uglifyHTML");
});
