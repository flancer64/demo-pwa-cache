# Demonstration of PWA Resource Caching Issues

This repository serves as a demonstration of common issues related to resource caching in Progressive Web Applications (
PWAs). PWAs aim to provide a native app-like experience to users through web technologies, including service workers for
resource caching. However, improper caching strategies can lead to various problems such as stale content, inconsistent
behavior across different devices, and performance degradation.

## Features

This app contains 3 pages that return server time:

* `No Cache`: This page is requested from the server every time.
* `Cached Data`: This page is cached in the browser for 60 seconds.
* `Service Worker`: This page is cached by the service worker in the cache storage; the storage must be cleared manually
  to refresh the page.

See the demo at https://cache.demo.teqfw.com/

## Local Usage

```shell
$ git clone https://github.com/flancer64/demo-pwa-cache.git
$ cd demo-pwa-cache
$ npm i
$ npm start
```

Open http://localhost:8080/