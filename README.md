# animate.css.js
Javascript(jQuery) helper for [animate.css)](https://daneden.github.io/animate.css), let the animation in the JavaScript to use more simple.

[Demo](http://lzw.me/pages/demo/animate.css.js/example)

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

## Installation

To install via npm:

```bash
npm i animate.css.js --save
```

Or download the latest [release](https://github.com/lzwme/animate.css.js/releases) package, and unzip it.

## USAGE

```js
// example for es6
import animate from 'animate.css.js';
import 'animate.css';

animate({$el: $('#logo')}).then(() => {
    console.log('执行完成')
});

animate({$el: '.div1:eq(0)', keyword: 'In'}).done((class) => {
    console.log(class)
});

animate('.div1:eq(0)', {keyword: /out/i}).done((class) => {
    console.log(class)
});

animate({$el: '.div1'}).then(() => {
    return animate({$el: '.div2'})
}).then(() => {
    return animate({$el: '.div3'})
});

// use as jQuery plugin
$('body').animatecssjs().then((type) => {
    console.log('end, animate type: ', type);
});

$('body').animatecssjs('zoomIn');

$('body').animatecssjs({
    type: 'shake',
    infinite: true
});
```

### Basic Usage

```js
<link href="//cdn.bootcss.com/animate.css/3.5.2/animate.min.css" rel="stylesheet">
<script src="//cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="animate.css.js/lib/animate.jquery.min.js"></script>
<script>
window.animatecssjs({$el: $('#logo')}).then(() => {
    console.log('执行完成')
});

window.animatecssjs('#logo'}).then(() => {
    console.log('执行完成')
});

window.animatecssjs('.div1').then(() => {
    return animate('.div2')
}).then(() => {
    return animate('.div3')
});
</script>
```

## Options

`$el: null,` Element for animate, jQuery or class\id selector

`type: '',` Animate type, String or Array.

`infinite: false,` Whether animate infinite.

`keyword: '',` Vaild when type='', String or RegExp.

`reset: true,`  Reset element class when animate end.

`hideScrollbar: true,` Whether hidden browser scrollbar.

`callback: null,` callback when infinite=false and animate end.

## Note on Patches / Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Send me a pull request. Bonus points for topic branches.

## License

animate.css.js is released under the MIT license.

该插件由[志文工作室](http://lzw.me)开发和维护。

[npm-image]: https://img.shields.io/npm/v/animate.css.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/animate.css.js
[github-tag]: http://img.shields.io/github/tag/lzwme/animate.css.js.svg?style=flat-square
[github-url]: https://github.com/lzwme/animate.css.js/tags
[travis-image]: https://img.shields.io/travis/lzwme/animate.css.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/lzwme/animate.css.js
[coveralls-image]: https://img.shields.io/coveralls/lzwme/animate.css.js.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/lzwme/animate.css.js?branch=master
[david-image]: http://img.shields.io/david/lzwme/animate.css.js.svg?style=flat-square
[david-url]: https://david-dm.org/lzwme/animate.css.js
[license-image]: http://img.shields.io/npm/l/animate.css.js.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/animate.css.js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/animate.css.js
