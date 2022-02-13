const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, './src', 'app'),
      '@commons': path.resolve(__dirname, '/src', 'commons'),
      '@movies': path.resolve(__dirname, './src', 'features', 'movies')
    }
  }
}
