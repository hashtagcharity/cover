(function(window, $) {
  'use strict';

  var Social = function() {
    this.bind();
  }

  Social.prototype.bind = function() {    
    $('.track_share').on('click', function() {
      var socialPlatform = $(this).data('social-platform');
      ga('send', 'social', socialPlatform, 'share', getCampaign(socialPlatform));
    });

    $('.linkedin_share').click(function(e) {
      var url = getCampaign('linkedin');
      var title = encodeURIComponent($(this).data('share-title'));
      var summary = encodeURIComponent($(this).data('share-summary'));
      var source = encodeURIComponent($(this).data('share-source'));
      var linkWindow = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + summary + '&source=' + source;
      window.open(linkWindow, '', 'width=600, height=500');
    });

    $('.facebook_share').click(function(e) {
      var url = getCampaign('facebook');
      var shareWindow = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
      window.open(shareWindow, '', 'width=700, height=400');
    });

    $('.twitter_share').click(function(e) {
      var url = encodeURIComponent($(this).data('share-url'));
      var text = encodeURIComponent($(this).data('share-text'));
      var hashtags = $(this).data('share-hashtags');
      var tweetWindow = 'https://twitter.com/share?text=' + text + '&url=' + url + '&hashtags=' + hashtags;
      window.open(tweetWindow, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=260,width=650');
    });

    $('.pinterest_share').click(function(e) {
      var url = getCampaign('pinterest');
      var media = encodeURIComponent($(this).data('share-media'));
      var description = encodeURIComponent($(this).data('share-description'));
      var pinWindow = 'https://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + description;
      window.open(pinWindow, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=310,width=750');
    });

    $('.googleplus_share').click(function(e) {
      var url = getCampaign('googleplus');
      var plusOneWindow = 'https://plus.google.com/share?url=' + url;
      window.open(plusOneWindow, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=670,width=515')
    });

    function getCampaign(platform) {
      return encodeURIComponent($('body').data('campaign-url') + '&utm_source=' + platform);
    }

  }

  return new Social;

})(window, $);