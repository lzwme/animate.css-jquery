// demo.js

$(function(animatecssjs) {
    var $select = $('#animateList'),
        $demo = $('#demo'),
        $log = $('#logs');

    function log(msg) {
        console.log(msg);
        $log.append('<p>' + msg + '</p>').scrollTop($log.height());
    }

    function animateDemo(el, type, opts) {
        var starttime = new Date();
        log('animate start: ' + (type || 'random'));
        $(el).html(type || 'random');

        return animatecssjs($.extend({$el: el, type: type}, opts)).then(function(_type) {
            $(el).html(_type);
            log('animate end [' + (new Date() - starttime) + 'ms] :' + _type);
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
        $select.on('change', function() {
            var type = $(this).val();

            animateDemo('#demo', type);
        });

        $('.infinite').on('click', function() {
            animateDemo('#demo', '', {
                infinite: true
            });
        });

        $('.k_in').on('click', function() {
            animateDemo('#demo', '', {
                keyword: 'in'
            });
        });

        $('.k_out').on('click', function() {
            animateDemo('#demo', '', {
                keyword: /out/i
            });
        });

        $('.random_test').on('click', function() {
            var $this = $(this);

            if ($this.hasClass('stop')) {
                $this.removeClass('stop btn-danger');
            } else {
                $this.addClass('btn-danger');

                animateDemo('#demo', '').then(function() {
                    $this.click();
                });
            }
        });

        $('.random_test_stop').on('click', function() {
            $('.random_test').addClass('stop');
        })

    }

    function init() {
        // animate body
        animatecssjs({$el: 'body'}).then(function(type) {
            log('animate body: ' + type);
            console.log('animate end');
        });

        initSelect();
        initEvents();
    }

    init();

}(window.animatecssjs));

