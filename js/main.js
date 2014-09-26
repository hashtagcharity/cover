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

  $('#counter').each(function() {
    $(this).parallax('50%', 0.3, true);
  });

  $('#to-top').hide();
  $('#sidebar').hide();

  $('#pitch').waypoint(function(direction) {
    if (direction === 'down') {
      $('#sidebar').fadeIn();
    } else {
      $('#sidebar').fadeOut();
    }
  });

  $('#to-top a').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

    $('#fullpage').fullpage({
      navigation: true,
      navigationPosition: 'right'

    });

})(jQuery);

