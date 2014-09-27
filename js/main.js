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

})(jQuery);

