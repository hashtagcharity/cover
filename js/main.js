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
      if (data.allSubscriptions > 1000) {
        $('#counter').css("display", "block");
        $('#counterNumber').html('<strong>' + numberWithCommas(data.allSubscriptions) + '</strong>');
      }
    }, "json");
  }

  function thanks() {
    var $subscribeSection = $('#subscribe-section');
    var $thankyouSection = $('#thankyou-section');

    $subscribeSection.fadeOut('fast', function() {
      $thankyouSection.fadeIn('fast', function() {
        $(this).delay(3000).fadeOut('fast', function() {
          $subscribeSection.fadeIn('fast');
        });
      })
    });
  }

  $('#subscribe').click(function() {
    var $emailaddress = $('#emailaddress');
    var emailAddressValue = $emailaddress.val();

    if (!emailAddressValue || emailAddressValue.length === 0 || !emailAddressValue.trim()) {
      return;
    }

    $.post("http://service.hashtagcharity.org:83/api/subscriptions/add", { emailAddress: emailAddressValue },
        function(data, textStatus, jqXHR) {
          $emailaddress.val('');
          updateCounter();

          // conversion tracking
          ga('send', 'event', 'subscribe', 'click');
          thanks();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          $emailaddress.val('');
          ga('send', 'event', 'subscribe', 'error');

          thanks();
        });
  });


  updateCounter();

})(jQuery);

