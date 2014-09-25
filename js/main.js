
(function() {
      new WOW( 
        {
          boxClass:     'wow',      
          animateClass: 'animated', 
          offset:       200 
        }
      ).init();
})();

(function(){
      // conversion tracking
    $('.btn-submit').click(function(e) {
      ga('send', 'event', 'subscribe', 'click');
    });

    $('#counter').each(function(){
      $(this).parallax('50%', 0.3, true);
    });

    $('#pitch').waypoint(function(direction) {
      if (direction === 'down') {
        $('#sidebar').show('slide');
      } else {
        $('#sidebar').hide('fast');
      }
    });
})(jQuery);


(function($) {

         // Smooth scroll for in page links
          var target, scroll;

          $("a[href*=#]:not([href=#])").on("click", function(e) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              target = $(this.hash);
              target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

              if (target.length) {
                if (typeof document.body.style.transitionProperty === 'string') {
                  e.preventDefault();

                  var avail = $(document).height() - $(window).height();

                  scroll = target.offset().top;

                  if (scroll > avail) {
                    scroll = avail;
                  }

                  $("html").css({
                    "margin-top": ($(window).scrollTop() - scroll) + "px",
                    "transition": "1s ease-in-out"
                  }).data("transitioning", true);
                } else {
                  $("html, body").animate({
                    scrollTop: scroll
                  }, 1000);
                  return;
                }
              }
            }
          });

          $("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
            if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
              $(this).removeAttr("style").data("transitioning", false);
              $("html, body").scrollTop(scroll);
              return;
            }
          });

})(jQuery);
