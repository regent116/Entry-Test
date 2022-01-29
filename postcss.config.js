/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
	plugins: [
		require('postcss-preset-env')({
			browsers: 'last 2 versions'
		}),
		require('postcss-nested')
	]
};
