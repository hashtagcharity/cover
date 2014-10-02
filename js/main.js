(function() {
  new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 100
  }).init();
})();

(function($) {

  // conversion tracking
  $('.btn-submit').click(function(e) {
    ga('send', 'event', 'subscribe', 'click');
  });

//  $('#to-top').hide();

/*
  $('#pitch').waypoint(function(direction) {
    if (direction === 'down') {
      $('#to-top').fadeIn();
    } else {
      $('#to-top').fadeOut();
    }
  });
*/

  var $root = $('html, body');

  $('#signmeup').click(function() {
    $root.animate({ 
      scrollTop: 0
    }, 1000);
    $('#emailaddress').focus();
    
    return false;
  });

  $('#header-bottom').click(function() {
    $root.animate({ 
      scrollTop: $('#pitch').offset().top 
    }, 800);
    return false;
  });

  $('#notifyme').click(function() {
    var $emailaddress = $('#emailaddress');
    $.post("http://hashtagcharity.org:83/api/subscriptions",
        {
            emailAddress: $emailaddress.val()
        },
        function(data, textStatus, jqXHR)
        {
            //data - response from server
        }).fail(function(jqXHR, textStatus, errorThrown) 
        {
            alert($emailaddress.val() + ": " + textStatus);
            $emailaddress.val('');
        })
  });

})(jQuery);

