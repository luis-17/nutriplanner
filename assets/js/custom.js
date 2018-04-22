$(function(){
    /*paquetes*/
    $.fn.extend({
      animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
          var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
          };

          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName);
        if (typeof callback === 'function') callback(); 
        return this;
      },
    });
    /* end paquetes*/

    $('a.link-to-menu[href*="#"]').on('click',function() {
        var thes = $(this); 
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 1000); 
                $('a.link-to-menu').parent().removeClass('active'); 
                thes.parent().addClass('active');
                $('#navbarMain').removeClass('show'); 
            }
        }
    });

    // sizing slider 
    setTimeout(function() { 
        var heightWindow = $(window).height(); 
        $('.image-background').height(heightWindow+'px');
    },100); 
    // animate letters 1 
    setTimeout(function(argument) { 
        $('#carouselHomeNP .carousel-caption.hidden-movil').show();
        $('#carouselHomeNP h2.mv-title').animateCss('slideInLeft');
        $('#carouselHomeNP p.mv-lema-1').animateCss('slideInRight');
    },1000); 


    var $animElements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() { 
      var fullyInView = true;
      var pageTop = $(window).scrollTop();
      var pageBottom = pageTop + $(window).height(); 

      $.each($animElements, function() { 
        var $element = $(this);
        var elementTop = $element.offset().top;
        var elementBottom = elementTop + $element.height();
        if( $element.height() > $(window).height() ){
            elementBottom = elementTop + ($(window).height() / 1.7); 
        }
        if((pageBottom > (elementBottom / 1.05) ) ){ 
          $element.animateCss('fadeIn', function() { 
            $element.css('opacity',1);
          });
        }
      }); 
    }
    setTimeout(function() { 
      $window.on('scroll resize', check_if_in_view);
      $window.trigger('scroll');
    },1000); 
});
