module.exports = function (config) {
	config.set({
		preprocessors: {
			"src/**/*.js": ["babelSourceMap"]
		},
		customPreprocessors: {
			babelSourceMap: {
				base: "babel",
				options: {
					presets: ["es2015"],
					sourceMap: "inline"
				},
				filename: function (file) {
					return file.originalPath.replace(/\.js$/, ".es5.js");
				},
				sourceFileName: function (file) {
					return file.originalPath;
				}
			},
			// Other custom preprocessors...
		},
		frameworks: ["mocha"],

      
	});
};