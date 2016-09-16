/**
 * @file animate 组件，设置元素动画。依赖于 animate.css
 * @author lizhiwen@meizu.com
 * @sine   2016-04-05
 * @update 2016-05-17
 * @module dwAnimate
 * @see 动画效果参见 ${@link https://daneden.github.io/animate.css/ animate.css}
 *
 * @example
 * 示例(ES6 方式)：
 *
 * import {animate} from 'animate.css.js';
 * animate({$el: $('#logo')}).then(() => {
 *     console.log('执行完成')
 * });
 *
 * animate({$el: '.div1', keyword: 'In'}).done((class) => {
 *     console.log(class)
 * });
 *
 * animate({$el: '.div1'}).then(() => {
 *     return animate({$el: '.div2'})
 * }).then(() => {
 *     return animate({$el: '.div3'})
 * });
 *
 */
'use strict';
// import 'animate.css';

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if ('undefined' !== typeof exports && 'undefined' === typeof module) {
        module.exports = factory(require('jquery'));
    } else if (window.jQuery) {
        window.animatecssjs = factory(window.jQuery);
    } else {
        throw new Error('Not found jQuery.');
    }
})(function($) {
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

    /**
     * animate 设置元素动画。依赖于 animate.css，应手动引入相关样式
     * @alias module:dwAnimate
     * @param {Object} options 主要参数示例：
     * ```js
     * {
     *     $el: null, 执行动画的元素jquery对象，或 class\id
     *     type: null, 动画类型，为 string。为空时随机取值执行；为数组列表时从列表中随机选择执行
     *     infinite: false, 是否无限运动
     *     keyword: '', 为随机取值时，限定包含关键字的动画列表。可为简单正则，未匹配到则随机取值
     *     reset: true,  执行后是否重置状态
     *     callback infinite为 false 时，成功执行后回调
     * }
     * ```
     * @return {Object}         $.Deferred 对象，当 infinite 为false时，动画执行完成后设置其状态为 resolved
     */
     function animate(options) {
        //支持的动画类型，75 种
        var animateFilterList = [], //用于 keyword 过滤
            $promise = $.Deferred(),
            animateClass,
            $el;

        if (!options) {
            return $promise.reject();
        }

        if (typeof options.$el === 'string') {
            $el = $(options.$el);
        } else if (typeof options.$e === 'string') {
            $el = $(options.$e);
        }

        $el = $(options.$el || options.$e);

        if (! $el.length) { //元素不存在
            return $promise.reject();
        }

        //首先移除所有已加载的动画类
        $el.removeClass(animateList.join(' ') + ' infinite animated');

        animateClass = options.type || options.animateClass;
        if ($.isArray(animateClass)) { //给定数组中随机显示
            animateClass = animateClass[Math.floor(Math.random() * animateClass.length)];
        }

        //过滤关键字的随机取值，keyword 可为字符串或正则表达式
        if (! animateClass && options.keyword) {
            if (typeof options.keyword === 'string') {
                options.keyword = new RegExp(options.keyword, 'i');
            }

            if (typeof options.keyword === 'object' && options.keyword.exec) {
                animateList.forEach(function(item){
                    if (options.keyword.test(item)) {
                        animateFilterList.push(item);
                    }
                });

                animateClass = animateFilterList[Math.floor(Math.random() * animateFilterList.length)];
            }
        }

        //随机取值
        if (!~animateList.indexOf(animateClass)) {
            animateClass = animateList[Math.floor(Math.random() * animateList.length)];
        }

        animateClass += ' animated';

        var $html = $('html:eq(0)');
        var hoverflow = $html.css('overflow');

        if (options.infinite) {
            animateClass += ' infinite';
            //标记执行完成
            $promise.resolve(animateClass.split(' animated')[0]);
        } else {
            $html.css('overflow', 'hidden');
        }

        $el.removeClass(animateList.join(' ')).removeClass(animateClass)
            .addClass(animateClass)
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $html.css('overflow', hoverflow);

                if (options.reset !== false) { //是否复原状态
                    $el.removeClass(animateClass);
                }

                if ($.isFunction(options.callback)){
                    options.callback();
                }

                //标记执行完成
                $promise.resolve(animateClass.split(' animated')[0]);
            });

        return $promise;
    }

    animate.animateList = animateList;

    // jQuery plugins
    $.fn.extend({
        animateCss: function (opts) {
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
