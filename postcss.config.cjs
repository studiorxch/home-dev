// postcss.config.cjs — clean dev mode
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')
    ]
};
