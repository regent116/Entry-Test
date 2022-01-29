const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(ttf|otf|woff2)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		historyApiFallback: true,
		host: '0.0.0.0',
		port: 8080,
		disableHostCheck: true,
		contentBase: path.resolve(__dirname, './dist'),
		proxy: {
			'/express': 'http://localhost:4000'
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': '*'
		},
		hot: true
	}
};
