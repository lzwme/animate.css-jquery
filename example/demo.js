// demo.js

$(function (animatecssjs) {
    var $select = $('#animateList'),
        $demo = $('#demo'),
        $log = $('#logs');

    function log(msg) {
        console.log(msg.replace(/<.*?>/g, ''));
        $log.prepend('<p>' + msg + '</p>'); // .scrollTop($log.height());
    }

    function animateDemo(el, type, opts) {
        var colors = ['#08f', '#f80', '#af0', '#f00', '#ff0', '#0ff', '#f0f', '#000', '#4a159f', '#170'];
        var starttime;

        if (!opts || !opts.nolog) {
            log('animate start: ' + (type || 'random'));
        }

        el = el || $demo;
        $(el).html(type || 'random').css('background', colors[Math.floor(Math.random() * colors.length)]);

        starttime = new Date();
        return animatecssjs($.extend({$el: el, type: type}, opts)).then(function (_type) {
            $(el).html(_type);

            if (!opts || !opts.nolog) {
                log('<hr> animate end [' + (new Date() - starttime) + 'ms] : <button class="animate-text btn btn-xs btn-success">' + _type + '</button>');
            }
        });
    }

    function initSelect() {
        var options = [],
            btns = [],
            btnType = ['default', 'primary', 'success', 'info', 'warning'],
            animateList = animatecssjs.animateList,
            i = 0,
            len = animateList.length;

        for (; i < len; i++) {
            options.push('<option value="' + animateList[i] + '"> ' + (i + 1) + '. ' + animateList[i] + '</option>');
            btns.push('<button class="animate-text btn btn-xs btn-' + btnType[i % 5] + '" style="margin: 3px">' + animateList[i] + '</button>');

        }

        $('#animateListBtn').html(btns.join(''));

        return $select.html(options.join('')).select2();
    }

    function initEvents() {
        var $randomTest = $('.random_test');
        var $randomTestStop = $('.random_test_stop');

        $select.on('change', function () {
            var type = $(this).val();

            animateDemo('#demo', type);
        });

        $('.infinite').on('click', function () {
            $randomTestStop.click();
            animateDemo('#demo', '', {
                infinite: true
            });
        });

        $('.k_in').on('click', function () {
            $randomTestStop.click();
            animateDemo('#demo', '', {
                keyword: 'in'
            });
        });

        $('.k_out').on('click', function () {
            $randomTestStop.click();
            animateDemo('#demo', '', {
                keyword: /out/i
            });
        });

        $randomTest.on('click', function () {
            $randomTest.addClass('btn-danger');

            animateDemo($demo, '').then(function () {
                if ($randomTest.hasClass('stop')) {
                    $randomTest.removeClass('stop');
                    return;
                }
                $randomTest.click();
            });
        });

        $randomTestStop.on('click', function () {
            $demo.removeClass('infinite animated');
            $randomTest.removeClass('btn-danger').addClass('stop');
        });

        $demo.on('click', function () {
            animateDemo($demo, $(this).text());
        });

        $(document).on('click', 'button.animate-text', function () {
            animateDemo($demo, $(this).text(), {
                nolog: true
            });
        });

    }

    function init() {
        // animate body
        animatecssjs({$el: 'body', hideScrollbar: true}).then(function (type) {
            log('animate body: ' + type);

            return $('.btn').each(function () {
                $(this).animatecssjs({keyword: /in/i});
            });
        });

        initSelect();
        initEvents();
    }

    init();

}(window.animatecssjs));

