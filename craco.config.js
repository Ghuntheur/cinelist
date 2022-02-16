const path = require('path')
const CreateFileWebpack = require('create-file-webpack')

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CreateFileWebpack({
          path: 'build',
          fileName: '_redirects',
          content: '/* /index.html 200'
        })
      ]
    },
    alias: {
      '@app': path.resolve(__dirname, './src', 'app'),
      '@shared': path.resolve(__dirname, '/src', 'shared'),
      '@movies': path.resolve(__dirname, './src', 'features', 'movies')
    }
  }
}
