---
title: Getting started with Analytics
description: Start here to learn how to build apps with the analytics npm module
pageTitle: Getting Started
subTitle: Start here to learn how to build apps with the analytics
---

This guide will walk you though installing & wiring up **analytics** in your application.

Analytics is designed to work with any frontend javascript framework and it works in plain static HTML. For framework specific implementation examples checkout the main [repo](https://github.com/DavidWells/analytics/tree/master/examples).

**Let's jump into it 👇**

## 1. Install the package

Install the analytics module into your project via [npm](https://www.npmjs.com/package/analytics)

```bash
npm install analytics
```

Or install via `yarn`

```bash
yarn add analytics
```

## 2. Include in project

Import `analytics` and initialize the library with the analytics plugins of your choice.

```js{2}
/* example file src/analytics.js */
import Analytics from 'analytics'

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    // ... your analytics integrations
  ]
})

/* export the instance for usage in your app */
export default analytics
```

See the [configuration docs](https://getanalytics.io/api/#configuration) for more details.

## 3. Connect plugins

**Connect analytics with a third party analytics tool**

To connect `analytics` to your third party tools (e.g. Google analytics), install the [provider plugin](https://getanalytics.io/plugins).

If there is no plugin for your provider, you can [create your own plugin](http://getanalytics.io/plugins/writing-plugins) or send us a [request](https://getanalytics.io/plugins/request/).

The example below is showing how to connect google analytics using the [google analytics plugin](https://getanalytics.io/plugins/google-analytics/).

This plugin will load the google analytics tracking script onto the page and handle page + custom event tracking.

```js{7-11}
/* src/analytics.js */
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    googleAnalytics({
      trackingId: 'UA-121991123',
    })
  ]
})

export default analytics
```

## 4. Use in your app

After we've initialized `analytics`, we need to call the [core methods](https://getanalytics.io/api/) in our application code.

Import the `analytics` instance created in the previous step and call a method:

- `analytics.page()` to send page view data.
- `analytics.track()` to send tracking events to your analytic providers
- `analytics.identify` to identify a website visitor

```js
// Import analytics instance into your app and call it's methods
import analytics from './analytics'

/* Track page views */
analytics.page()

/* Identify users */
analytics.identify('userid-123', {
  favoriteColor: 'blue',
  membershipLevel: 'pro'
})

/* Track events */
analytics.track('buttonClicked', {
  value: 100
})
```

See the api docs for further details:

- [Page](https://getanalytics.io/api/#analyticspage)
- [Track](https://getanalytics.io/api/#analyticstrack)
- [Identify](https://getanalytics.io/api/#analyticsidentify)

## Usage in React

Checkout the [using analytics with react demo](https://analytics-react-example.netlify.com/) & the [source code](https://github.com/DavidWells/analytics/tree/master/examples/react)

For a larger example see the [kitchen sink example](https://analytics-demo.netlify.com) & it's [source code](https://github.com/DavidWells/analytics/tree/master/examples/demo).

## Usage in HTML

Analytics works in vanilla HTML pages and can be [imported from a CDN](#cdn-browser-usage).

[Live demo](https://analytics-html-example.netlify.com/) & the [source code](https://github.com/DavidWells/analytics/tree/master/examples/vanilla-html).

## Usage in Gatsby

To use analytics with Gatsby install the [gatsby-plugin-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-analytics/) plugin.

[Live demo](https://getanalytics.io/) (this site) & the [source code](https://github.com/DavidWells/analytics/blob/09a720fdd89b5bb418e349cf24e0b4658f2bee95/site/gatsby-theme-oss-docs/src/analytics.js).

```
npm install gatsby-plugin-analytics
```

And add to your `gatsby.config.js` file. This will enable automate page tracking.

```
{
  resolve: 'gatsby-plugin-analytics'
}
```

See the [gatsby-plugin-analytics docs](https://www.gatsbyjs.org/packages/gatsby-plugin-analytics/) for more details.

You can also reference the various [react examples](http://localhost:8000/tutorial/getting-started/#usage-in-react) above and directly integrate with a `pushState` listener in your site.

## Usage in Preact

Preact is a fast 3kB alternative to React with the same modern API.

[Using analytics with preact demo](https://analytics-preact-example.netlify.com/) & the [source code](https://github.com/DavidWells/analytics/tree/master/examples/preact).

## Usage in Vue

[Using analytics with vue demo](https://analytics-vue-example.netlify.com/) & the [source code](
https://github.com/DavidWells/analytics/tree/master/examples/vue).

## Usage in Angular

Demo coming soon. The above steps will work for Vue apps.

([contributions to the docs welcome](https://github.com/DavidWells/analytics/tree/master/examples) 😃).

## ES6 Usage

```js
import Analytics from 'analytics'
import googleAnalyticsPlugin from '@analytics/google-analytics'
import customerIOPlugin from '@analytics/customerio'

/* Initialize analytics */
const analytics = Analytics({
  app: 'my-app-name',
  version: 100,
  plugins: [
    googleAnalyticsPlugin({
      trackingId: 'UA-121991291',
    }),
    customerIOPlugin({
      siteId: '123-xyz'
    })
  ]
})

/* Track a page view */
analytics.page()

/* Track a custom event */
analytics.track('userPurchase', {
  price: 20
  item: 'pink socks'
})

/* Identify a visitor */
analytics.identify('user-id-xyz', {
  firstName: 'bill',
  lastName: 'murray',
  email: 'da-coolest@aol.com'
})
```


## CDN Browser usage

When importing global `analytics` into your project from a cdn the library is expose via a global `_analytics` variable.

Call `_analytics.init` to create an analytics instance.

```html
<script src="https://unpkg.com/analytics/dist/analytics.min.js"></script>
<script>
  const Analytics = _analytics.init({
    app: 'my-app-name',
    version: 100,
    ...plugins
  })

  Analytics.track()

  // optionally expose to window
  window.Analytics = Analytics
</script>
```


## Node.js Usage


For ES6/7 javascript you can `import Analytics from 'analytics'` for normal node.js usage you can import like so:

```js
const { Analytics } = require('analytics')
// or const Analytics = require('analytics').default

const analytics = Analytics({
  app: 'my-app-name',
  version: 100,
  plugins: [
    googleAnalyticsPlugin({
      trackingId: 'UA-121991291',
    }),
    customerIOPlugin({
      siteId: '123-xyz'
    })
  ]
})

// Fire a page view
analytics.page()
```
