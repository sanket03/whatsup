importScripts('workbox-sw.prod.v2.1.2.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "whatsup",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.828c96633ca4ec64ad93.js",
    "revision": "54db16eb1937a06d3fd08ae6569327e3"
  },
  {
    "url": "/_nuxt/layouts_default.6583fbfa8627de12f538.js",
    "revision": "5c0adfb7118c39f00ea5fb5ac83b9429"
  },
  {
    "url": "/_nuxt/manifest.d1407f2b78db7eedc159.js",
    "revision": "3946adc5bb12b90d72e7e0625c0029a9"
  },
  {
    "url": "/_nuxt/pages_index.0d535658a5894af01e64.js",
    "revision": "f31bcc01d3e975d2edbbcac705560045"
  },
  {
    "url": "/_nuxt/vendor.46be07abcb85da94cbc0.js",
    "revision": "7719fa2fb682a12280c9ea03f87a6a31"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

