
module.exports = {
  pathPrefix: '/',
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-oss-docs',
      options: {
        root: __dirname,
        subtitle: 'npm install rc-formly/core',
        description: 'How to use the rc-formly npm module',
        githubRepo: 'nkovacic/rc-formly',
        spectrumPath: 'rc-formly',
        sidebarCategories: {
          null: [
            'tutorial/getting-started',
          ],
          Docs: [
            'api'
          ],
          Api: [
            'api/rc-formly-provider',
            'api/rc-formly-form',
            'api/rc-formly-field',
            'api/rc-formly-wrapper'
          ]
        }
      }
    }
  ]
}
