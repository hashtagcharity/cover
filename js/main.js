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

  function updateCounter() {

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $.get("http://landing.hashtagcharity.org:83/api/subscriptions/statistics", function(data) {
      $('#counter').css("display", "block");
      $('#counterNumber').html('<strong>' + numberWithCommas(data.allSubscriptions) + '</strong>');
    }, "json");
  }


  $('#subscribe').click(function() {
    var $emailaddress = $('#emailaddress');
    var emailAddressValue = $emailaddress.val();

    if (!emailAddressValue || emailAddressValue.length === 0 || !emailAddressValue.trim()) {
      return;
    }

    $.post("http://landing.hashtagcharity.org:83/api/subscriptions/add", { emailAddress: emailAddressValue },
        function(data, textStatus, jqXHR) {
          $emailaddress.val('');
          updateCounter();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          alert($emailaddress.val() + ": " + textStatus);
          $emailaddress.val('');
        });

    // conversion tracking
    ga('send', 'event', 'subscribe', 'click');
  });


  updateCounter();

})(jQuery);

