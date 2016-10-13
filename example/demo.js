// demo.js

$(function (animatecssjs) {
    var $select = $('#animateList'),
        $demo = $('#demo'),
        $log = $('#logs');

    function log(msg) {
        console.log(msg);
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
                log('<hr> animate end [' + (new Date() - starttime) + 'ms] : <button class="btn btn-xs btn-info">' + _type + '</button>');
            }
        });
    }

    function initSelect() {
        var options = [];
            animateList = animatecssjs.animateList,
            i = 0,
            len = animateList.length;

        for (; i < len; i++) {
            options.push('<option value="' + animateList[i] + '"> ' + (i + 1) + '. ' + animateList[i] + '</option>');
        }

        return $select.html(options.join(''));
    }

    function initEvents() {
        $select.on('change', function () {
            var type = $(this).val();

            animateDemo('#demo', type);
        });

        $('.infinite').on('click', function () {
            animateDemo('#demo', '', {
                infinite: true
            });
        });

        $('.k_in').on('click', function () {
            animateDemo('#demo', '', {
                keyword: 'in'
            });
        });

        $('.k_out').on('click', function () {
            animateDemo('#demo', '', {
                keyword: /out/i
            });
        });

        $('.random_test').on('click', function () {
            var $this = $(this);

            if ($this.hasClass('stop')) {
                $this.removeClass('stop btn-danger');
            } else {
                $this.addClass('btn-danger');

                animateDemo('#demo', '').then(function () {
                    $this.click();
                });
            }
        });

        $('.random_test_stop').on('click', function () {
            $('.random_test').addClass('stop');
        });

        $demo.on('click', function () {
            animateDemo($demo, $(this).text());
        });

        $log.on('click', 'button', function () {
            animateDemo($demo, $(this).text(), {
                nolog: true
            });
        });

    }

    function init() {
        // animate body
        animatecssjs({$el: 'body'}).then(function (type) {
            log('animate body: ' + type);

            return $('.btn').animatecssjs({
                keyword: /in/i
            });
        }).then(function (type) {
            log('<hr> animate btns: ' + type);
        });

        initSelect();
        initEvents();
    }

    init();

}(window.animatecssjs));

