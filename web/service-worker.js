/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

var CACHE_NAME = 'coincounter-v1.0'

var URLS = [
	'/css/style.css',
	'/js/script.js',
	'/?standalone=true',
	'/'
]

this.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(URLS);
		})
	);
});

this.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			}

			return fetch(event.request).then(function (response) {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				var responseToCache = response.clone();
				caches.open(CACHE_NAME).then(function (cache) {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});
