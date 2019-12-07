/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const { src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const yaml = require('gulp-yaml');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const srcDirectory = 'web'
const destDirectory = 'dist'

function copyImages() {
	return src(srcDirectory + '/images/**/*')
		.pipe(dest(destDirectory + '/images'))
}

function copyHTML() {
	return src(srcDirectory + '/**/*.html')
		.pipe(dest(destDirectory))
}

function copyServiceWorker() {
	return src(srcDirectory + '/service-worker.js')
		.pipe(dest(destDirectory))
}

const copy = parallel(copyImages, copyHTML, copyServiceWorker)

function compileJS() {
	return src(srcDirectory + '/js/main.js')
		.pipe(webpack({
			devtool: 'source-map',
			mode: 'production',
			output: {
				filename: 'script.js',
				publicPath: '/js/'
			}
		}))
		.pipe(dest(destDirectory + '/js'));
}

function compileSCSS() {
	return src(srcDirectory + '/scss/main.scss')
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('style.css'))
		.pipe(dest(destDirectory + '/css'));
}

function compileYAML() {
	return src(srcDirectory + '/yaml/**/*')
		.pipe(yaml())
		.pipe(dest(destDirectory + '/json'))
}

const compile = parallel(compileJS, compileSCSS, compileYAML)

exports.build = parallel(copy, compile)