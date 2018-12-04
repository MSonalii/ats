module.exports = function (config) {
	config.set({
		preprocessors: {
			"base-server/**/*.js": ["babelSourceMap"],
			"services/**/*.js": ["babelSourceMap"],
			"test/**/*.js": ["babelSourceMap"]
		},
		customPreprocessors: {
			babelSourceMap: {
				base: "babel",
				options: {
					presets: ["env"],
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