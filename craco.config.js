const path = require('path')

module.exports = {
  webpack: {
    remove: ['moduleScopePlugin'],
    alias: {
      '@app': path.resolve(__dirname, './src', 'app'),
      '@shared': path.resolve(__dirname, '/src', 'shared'),
      '@movies': path.resolve(__dirname, './src', 'features', 'movies')
    }
  }
}
