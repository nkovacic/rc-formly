---
title: Javascript Cookie Utilities
pageTitle: Cookie Utils
description: Utility library for managing HTML cookies
---

[Tiny](https://bundlephobia.com/result?p=@analytics/cookie-utils) cookie utilities library for [analytics](https://npmjs.com/package/analytics) & whatever else 🌈

Exposes `getCookie`, `setCookie`, `removeCookie`, & `hasCookieSupport` functions.

This will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

## How to install

Install `@analytics/cookie-utils` from [npm](https://www.npmjs.com/package/@analytics/cookie-utils).

```bash
npm install @analytics/cookie-utils
```

## API

Below is the api for `@analytics/cookie-utils`. These utilities are tree-shakable.

## `getCookie`

Get a cookie value.

```js
import { getCookie } from '@analytics/cookie-utils'

const value = getCookie('cookie-key')
```

## `setCookie`

Set a cookie value.

```js
import { setCookie } from '@analytics/cookie-utils'

/* simple set */
setCookie('test', 'a')

/* complex set - cookie(name, value, ttl, path, domain, secure) */
setCookie('test', 'a', 60*60*24, '/api', '*.example.com', true)
```

## `deleteCookie`

Delete a cookie.

```js
import { deleteCookie } from '@analytics/cookie-utils'

deleteCookie('cookie-key')
```

## `hasCookieSupport`

Check if cookies are supported. Will verify browser will accept cookies

```js
import { hasCookieSupport } from '@analytics/cookie-utils'

if (hasCookieSupport()) {
  // Use them 🍪
}
```
