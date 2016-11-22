/**
 * @file animate 组件，设置元素动画。依赖于 animate.css
 * @author lzwy0820@gmail.com
 * @sine   2016-04-05
 * @update 2016-11-03
 * @module dwAnimate
 * @see 动画效果参见 ${@link https://daneden.github.io/animate.css/ animate.css}
 * @github https://github.com/lzwme/animate.css.js
 */
'use strict';
// import 'animate.css';

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('animatecssjs', ['jquery'], factory);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('jquery'));
    } else if (window.jQuery) {
        window.animatecssjs = factory(window.jQuery);
    } else {
        throw new Error('Not found jQuery.');
    }
})(function ($) {
    // 75 种效果
    var animateList = [
        'bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello',
        'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp',
        'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig',
        'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig',
        'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
        'lightSpeedIn', 'lightSpeedOut',
        'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight',
        'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
        'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight',
        'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp',
        'hinge', 'rollIn', 'rollOut'
    ];
    var animationEnd;

    /**
     * 取得当前浏览器支持的动画结束类型
     */
    function getAnimationEnd() {
        var type;
        var list = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        list.split(' ').forEach(function (curtype) {
            if (window.hasOwnProperty('on' + curtype)) {
                type = curtype;
            }
        });

        return type || list;
    }

    animationEnd = getAnimationEnd();

    /**
     * animate 设置元素动画。依赖于 animate.css，应手动引入相关样式
     * @param {String|Object} options.el 为 $el 或 options
     * @param {Object} options 主要参数示例：
     * ```js
     * {
     *     $el: null, 执行动画的元素jquery对象，或 class\id
     *     type: null, 动画类型，为 string。为空时随机取值执行；为数组列表时从列表中随机选择执行
     *     infinite: false, 是否无限运动
     *     keyword: null, 为随机取值时，限定包含关键字的动画列表。可为简单正则，未匹配到则随机取值
     *     reset: true,  执行后是否重置状态
     *     hideScrollbar: true, 执行时是否隐藏浏览器 scrollbar
     *     callback infinite为 false 时，成功执行后回调
     * }
     * ```
     * @return {Object}         $.Deferred 对象，当 infinite 为false时，动画执行完成后设置其状态为 resolved
     */
    function animate(el, options) {
        // 支持的动画类型，75 种
        var animateFilterList = [], // 用于 keyword 过滤
            $promise = $.Deferred(),
            animateClass,
            $el,
            $html;

        if (typeof el === 'string' || el.length) {
            $el = $(el);
        } else {
            options = el;
        }
        options = $.extend(true, {
            type: null,
            infinite: false,
            keyword: null,
            reset: true,
            hideScrollbar: true
        }, options);

        $el = $($el || options.$el || options.$e || options.el);

        if (!$el.length) { // 元素不存在
            return $promise.reject('not found target element');
        }

        // 首先移除所有已加载的动画类
        $el.removeClass(animateList.join(' ') + ' infinite animated');

        animateClass = options.type || options.animateClass;
        if ($.isArray(animateClass)) { // 给定数组中随机显示
            animateClass = animateClass[Math.floor(Math.random() * animateClass.length)];
        }

        // 过滤关键字的随机取值，keyword 可为字符串或正则表达式
        if (!animateClass && options.keyword) {
            if (typeof options.keyword === 'string') {
                options.keyword = new RegExp(options.keyword, 'i');
            }

            if (typeof options.keyword === 'object' && options.keyword.exec) {
                animateList.forEach(function (item) {
                    if (options.keyword.test(item)) {
                        animateFilterList.push(item);
                    }
                });

                animateClass = animateFilterList[Math.floor(Math.random() * animateFilterList.length)];
            }
        }

        // 随机取值
        if (!~animateList.indexOf(animateClass)) {
            animateClass = animateList[Math.floor(Math.random() * animateList.length)];
        }

        animateClass += ' animated';

        if (options.hideScrollbar) {
            $html = $('html:eq(0)');
        }

        if (options.infinite) {
            animateClass += ' infinite';
            // 标记执行完成
            $promise.resolve(animateClass.split(' animated')[0]);
        } else if (options.hideScrollbar) {
            $html.css('overflow', 'hidden');
        }

        $el.removeClass(animateList.join(' ')).removeClass(animateClass)
            .addClass(animateClass)
            .one(animationEnd, function () {
                if (options.hideScrollbar) {
                    $html.css('overflow', '');
                }

                if (options.reset) { // 是否复原状态
                    $el.removeClass(animateClass);
                }

                if ($.isFunction(options.callback)) {
                    options.callback();
                }

                // 标记执行完成
                $promise.resolve(animateClass.split(' animated')[0]);
            });

        return $promise;
    }

    animate.animateList = animateList;

    // jQuery plugins
    $.fn.extend({
        animatecssjs: function (opts) {
            if ('string' === typeof opts) {
                opts = {type: opts};
            }

            opts = $.extend({}, opts, {
                $el: $(this)
            });

            return animate(opts);
        }
    });

    return animate;
});
