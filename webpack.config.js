var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		"webpack-dev-server/client?http://localhost:8888",
		"webpack/hot/only-dev-server",
		"./client/entry.jsx"
	],
	output: {
		path: __dirname + '/static',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8888/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractText("styles.css")
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel-loader?{"presets": ["react","es2015"]}'],
				exclude: /node_modules/
			},
			{
				test: /\.scss?$/,
				exclude: /node_modules/,
				loader: ExtractText.extract("style", "css", "sass")
			}
		]
	}
}