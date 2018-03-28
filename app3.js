
    //  ******* THIS IS TO HIDE THE NAVBAR **********
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('nav').removeClass('nav-down').addClass('nav-up');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('nav').removeClass('nav-up').addClass('nav-down');
        }
      }

      lastScrollTop = st;
    }
    // ********** THIS IS FOR THE PROJECTS TO ASPECT ON MOBILE********
    function myFunction(x) {
      if (x.matches) { // If media query matches
        $('.project').removeClass("col-xs-6").addClass("col-xs-12")
      } else if (!x.matches) {
        $('.project').removeClass("col-xs-12").addClass("col-xs-6")
      }
    }
    // var y = window.matchMedia("(max-width:900px)")
    var x = window.matchMedia("(max-width: 450px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
