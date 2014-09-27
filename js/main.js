(function() {
  new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 200
  }).init();
})();

(function($) {

  // conversion tracking
  $('.btn-submit').click(function(e) {
    ga('send', 'event', 'subscribe', 'click');
  });

  $('#to-top').hide();
  $('#sidebar').hide();

  $('#pitch').waypoint(function(direction) {
    if (direction === 'down') {
      $('#sidebar').fadeIn();
      $('#to-top').fadeIn();
    } else {
      $('#sidebar').fadeOut();
      $('#to-top').fadeOut();
    }
  });

  var $root = $('html, body');

  $('#to-top a').click(function() {
    $root.animate({ 
      scrollTop: 0
    }, 1000);
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
    $.post("http://localhost:8080/saywhat",
        {
            email: $emailaddress.val()
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

