module.exports = {
  basePath: process.env.GITHUB_ACTIONS && '/portfolio',
  trailingSlash: true,
  env: {
    deployURL: 'https://pro-ktmr.github.io/portfolio/',
  },
}
