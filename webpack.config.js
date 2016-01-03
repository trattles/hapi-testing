var webpack = require('webpack');

module.exports = {
	entry: [
		"webpack-dev-server/client?http://0.0.0.0:3000",
		"webpack/hot/only-dev-server",
		"./client/entry.jsx",
	],
	output: {
		path: './static',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel-loader?{"presets": ["react","es2015"]}'],
				exclude: /node_modules/
			}
		]
	}
}