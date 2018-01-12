$(document).ready(function() {

  'use strict';

  // =====================
  // Homepage Layout
  // =====================

  // Make the second and third posts in homepage be 50% width
  $('.is-home .js-post-card-wrap:nth-of-type(2), .is-home .js-post-card-wrap:nth-of-type(3)')
  .addClass('o-grid__col--2-4-m o-grid__col--2-4-l');

  // =====================
  // Responsive videos
  // =====================

  $('.c-content').fitVids({
    'customSelector': ['iframe[src*="ted.com"]']
  });

  // =====================
  // Off Canvas menu
  // =====================

  $('.js-off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.js-off-canvas-content, .js-off-canvas-container').toggleClass('is-active');
  });

  // =====================
  // Post Card Images Fade
  // =====================

  $('.js-fadein').viewportChecker({
    classToAdd: 'is-inview', // Class to add to the elements when they are visible
    offset: 100,
    removeClassAfterAnimation: true
  });

  // =====================
  // Search
  // =====================

  var search_field = $('.js-search-input'),
      search_results = $('.js-search-result'),
      toggle_search = $('.js-search-toggle'),
      search_result_template = "\
        <div class='c-search-result__item'>\
          <a class='c-search-result__title' href='{{link}}'>{{title}}</a>\
        </div>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.js-search').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.js-off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.c-search, .js-search-close').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'js-search-close' || event.keyCode == 27) {
      $('.c-search').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    rss             : base_url + '/feed.xml',
    info_template   : "<h4 class='c-search-result__head'>Number of results found: {{amount}}</h4>",
    result_template : search_result_template,
    zeroResultsInfo : false,
    before: function() {
      search_results.fadeIn();
    }
  });

  // =====================
  // Instagram Feed
  // Get your userId and accessToken from the following URLs, then replace the new values with the
  // the current ones.
  // userId: https://smashballoon.com/instagram-feed/find-instagram-user-id/
  // accessToken: http://instagram.pixelunion.net/
  // =====================

  var instagramFeed = new Instafeed({
    get: 'user',
    limit: 9,
    resolution: 'thumbnail',
    userId: '4476360',
    accessToken: '4476360.1677ed0.7998def2d91840db838a12b188f4f866',
    template:
      '<div class="c-widget-instagram__item"><a href="{{link}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></div>'
  });

  if ($('#instafeed').length) {
    instagramFeed.run();
  }
});