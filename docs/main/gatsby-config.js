
module.exports = {
  pathPrefix: '/',
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-oss-docs',
      options: {
        root: __dirname,
        subtitle: 'npm install formik-formly-core formik-formly-bootstrap',
        description: 'How to use the formik-formly npm module',
        githubRepo: 'nkovacic/formik-formly',
        spectrumPath: 'formik-formly',
        sidebarCategories: {
          null: [
            'tutorial/getting-started',
          ],
          Docs: [
            'api',
            'lifecycle',
            'plugins/index',
            'using-listeners',
            'debugging',
            'plugins/writing-plugins',
          ],
          Plugins: [
            'plugins/google-analytics',
            'plugins/google-tag-manager',
            'plugins/segment',
            'plugins/customerio',
            'plugins/hubspot',
            'plugins/fullstory',
            'plugins/crazyegg',
            'plugins/simple-analytics',
            'plugins/do-not-track',
            'plugins/tab-events',
            'plugins/window-events',
            'plugins/original-source',
            'plugins/event-validation',
            'plugins/request',
          ],
          Utilities: [
            'utils/cookies',
            'utils/forms',
          ],
          Tutorials: [
            'tutorial/getting-started',
            'tutorial/handling-campaign-url-parameters',
          ],
          Resources: [
            'resources/faq',
            '[Github Repo](https://github.com/nkovacic/formik-formly)',
          ],
        }
      }
    }
  ]
}
