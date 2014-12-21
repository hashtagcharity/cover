'use strict';

(function() {
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: false
    }).init();
})();

(function($) {

    $('#signmeup').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        $('#emailaddress').focus();

        return false;
    });

    if (window.matchMedia("(max-width: 769px)").matches) {
        //We are 769px or below, disable fadeIn animation
        $('#sidebar').fadeIn();
    } else {
        $('#pitch').waypoint(function(direction) {
            if (direction === 'down') {
                $('#sidebar').fadeIn();
            } else {
                $('#sidebar').fadeOut();
            }
        })
    }

    function updateCounter() {

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        $.get("http://service.hashtagcharity.org:83/api/subscriptions/statistics", function(data) {
            if (data.allSubscriptions > 744) {
                $('#counter').css("display", "block");
                $('#counterNumber').html('<strong>' + numberWithCommas(data.allSubscriptions) + '</strong>');
            }
        }, "json");
    }

    $('#subscribe-1').click(function() {
        doSubscription(1, thanks, fail)
    });

    $('#subscribe-2').click(function() {
        doSubscription(2, thanks, fail)
    });

    $('#subscribe-section-1').keyup(function(event) {
        if (event.keyCode == 13) {
            doSubscription(1, thanks, fail);
        }
    });

    $('#subscribe-section-2').keyup(function(event) {
        if (event.keyCode == 13) {
            doSubscription(2, thanks, fail);
        }
    });

    function doSubscription(subNumber, success, failure) {
        var $emailaddress = $('#emailaddress-' + subNumber);
        var emailAddressValue = $emailaddress.val();

        if (!emailAddressValue || emailAddressValue.length === 0 || !emailAddressValue.trim()) {
            ga('send', 'event', 'subscribe', 'emptyaddress');
            return;
        }

        $.post("http://service.hashtagcharity.org:83/api/subscriptions/add", {
                    emailAddress: emailAddressValue
                },
                function(data, textStatus, jqXHR) {
                    $emailaddress.val('');
                    success(subNumber);
                })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $emailaddress.val('');
                failure(errorThrown, subNumber);
            });
    }

    function thanks(subNumber) {
        updateCounter();

        // conversion tracking
        ga('send', 'event', 'subscribe', 'click');

        var $subscribeSection = $('#subscribe-section-' + subNumber);
        var $thankyouSection = $('#thankyou-section-' + subNumber);

        $subscribeSection.fadeOut('fast', function() {
            $thankyouSection.fadeIn('fast', function() {
                $(this).delay(3000).fadeOut('fast', function() {
                    $subscribeSection.fadeIn('fast');
                });
            })
        });
    }

    function fail(errorThrown, subNum) {
        ga('send', 'event', 'subscribe', 'error');
        console.log('subscription ' + subNum + ' failed...')
    }

    updateCounter();

})(jQuery);