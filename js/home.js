jQuery.extend(jQuery.easing, {
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
});

jQuery.fn.extend({
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

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

var timeoutID;

jQuery(document).ready(function () {
    var stashClasses = new Array("classic", "chinese", "redneck");
    var stash = 0;
    $("#about figure").mouseenter(function (e) {
        $(this).addClass(stashClasses[stash]);
        if (stash <= 1)
            stash++;
        else
            stash = 0;
    });

    $("#about figure").mouseleave(function (e) {
        $(this).removeClass("classic chinese redneck");
    });

    $("#hero h1").on("hover", "span",function(e){
        $("#title").addClass("active");
    });
    $("#title").mouseleave(function(){
        $("#title").removeClass("active");            
    });
    var newText = new Array;
    var rotatingIndex = 0;
    
    newText['product-designer'] = "A digital <span>product designer <i class=\"line\"></i></span>  based in London. Turning complex processes into simple, meaningful and engaging experiences is what I do.";
    
    newText['problem-solver'] = "A skilled <span>problem solver<i class=\"line\"></i></span> with the heart of a designer and the mind of an engineer.I trust that a good process will always lead to good outcomes.";
    
    newText['specialist-generalist'] = " A good <span>specialist-generalist <i class=\"line\"></i></span> with a wide range of design skills. Fluid in design thinking, UX, IxD and UI.";
    
    newText['unicorn-designer'] = "A magic <span>unicorn designer <i class=\"line\"></i></span> that eats challenges and poops elegant solutions. Running wild through the meadows where function and delight intersect.";
    
    var $titleEelector = $("#title");
    timeoutID = window.setInterval(rotateTitle, 10000);
    
    $("#title a").each(function(){
        $(this).click(function(e){
            e.preventDefault();
            var mme=$(this).attr('href').substring(1);
            //rotatingIndex =  $("#title a").index(this);   
            $("#hero h1").fadeOut("fast",function(){
                 
                $("#hero h1").html(newText[mme]);
                $("#hero h1").fadeIn("fast",function(){
                    
                    $("#hero .line").addClass("active");

                    clearInterval(timeoutID);
                    timeoutID = window.setInterval(rotateTitle, 10000);
                });
            });
            
            $("#hero").removeClass("product-designer problem-solver specialist-generalist unicorn-designer").addClass(mme);
            $titleEelector.removeClass("active");
            
             
            /*
            $("#hero h1").animateCss("jello",function(){
                
                $("#hero h1").html(newText[mme]).animateCss("jello",function(){
                    $("#hero .line").addClass("active");
                    clearInterval(timeoutID);
                    timeoutID = window.setInterval(rotateTitle, 10000);
                });
            })
            */
            
        }); 
    });
    
    $("#hero .line").addClass("active");
     
    function rotateTitle(){
        $("#hero .line").removeClass("active");
        
        if(rotatingIndex<3)
        rotatingIndex++;
        else
            rotatingIndex = 0;
        
        $("#title a").get(rotatingIndex).click();
    };
    
    
    
    /*
    ------------- About section navigation ----------------
    */
    
    $(".readmore").click(function(){
        $("#morePop").fadeIn();
    });
    
    $("#togglePOP").click(function(){
        $("#morePop").fadeOut();
        
         $('html,body').animate({
            scrollTop: 0
        }, 1000, "easeOutCirc");
    });
    
    
    /*
    ------------- Somooth scroll down on hint click ----------------
    */
    $('.scroll-down').on("click", function (e) {
        e.preventDefault();

        $('nav').removeClass('is-open');
        $('#menu-push').removeClass('is-open');
        
        if($(this).attr('href') ==  "#about" || $(this).attr('href') ==  "#process"){
            $("#morePop").fadeIn();
        }
        
        if (!jQuery.browser.mobile)
            destination = $($(this).attr('href')).offset().top - 200;
        else
            destination = this.dataset.scrollDestinationMobile;
        
        
        
        $('html,body').animate({
            scrollTop: destination
        }, 2000, "easeOutCirc");

    });

    /*
    ------------- NAVIGATION ----------------
    */
    $('nav .mobile-nav-toggle').click(function (e) {
        e.preventDefault();

        if ($('#toggle').hasClass('is-back')) {
            //handle back from project  to main page
            reload();
        } else {
            if ($('nav').hasClass('is-open')) {
                $('nav').removeClass('is-open');
                $('#menu-push').removeClass('is-open');

                
                $('#letter-push').removeClass('is-open');
            } else {
                $('nav').addClass('is-open');
                $('#menu-push').addClass('is-open');
                $('#letter-push').addClass('is-open');
            }
        }
    });
    /*
    ------------- TODO NAVIGATION ----------------
        hide menu once scroll goes to item
    */
    
    /*
    -------------  Notice ----------------
        hide notice
    */
    
    $("#closenotif").click(function(){
        $("#under").fadeOut('fast');
    });
    $("#under .line").addClass("countdown");
    window.setTimeout(function(){ $("#under").fadeOut('fast')}, 35000);
    
    
    /*
    ------------- TODO When scrolled all way to bottom do as on android hint ----------------
       
    */

    // parallaxy-options='{"multiplier":"0.06", "direction":"up", "positionType": "relative"}'


    var scrollPosition = 0,
        $window = $(window),
        scrollTop = window.pageYOffset,
        win_height_padded = $window.height() * 1.1,
        win_width_padded = $window.width() * 1.1;
        
    var $parallaxable = document.getElementsByClassName('parallaxable'),
        ajaxContainer = document.getElementById('results'),
        parallaxableCount = $parallaxable.length;

    /**/
    var pageWrap = document.getElementById('page'),
        pages = [].slice.call(pageWrap.querySelectorAll('div.container')),
        currentPage = 0,
        triggerLoading = [].slice.call(pageWrap.querySelectorAll('a.pageload-link')),
        loader = new SVGLoader(document.getElementById('loader'), {
            speedIn: 500,
            easingIn: mina.easeinout
        });

    /** make screen adjustments */
    function loaderinit() {
        triggerLoading.forEach(function (trigger) {
            trigger.addEventListener('click', function (ev) {
                ev.preventDefault();
                
                
                scrollPosition = scrollTop;

                url = this.getAttribute('href');
                hash = this.dataset.hash;

                loader.show(function () {
                    //once the loader is fully shown
                    setTimeout(function () {
                        $("#results").load(url, function () {
                            $('#page').addClass('hidden');
                            $('#toggle').addClass('is-back');
                            window.scrollTo(0, 0);
                            window.location.hash = hash;

                            $parallaxable = ajaxContainer.getElementsByClassName('parallaxable');
                            parallaxableCount = $parallaxable.length;

                            loader.hide();
                        });
                    }, 1000);
                });
            });
        });
    } // loaderinit */

    function reload() {
        loader.show(function () {
            //once the loader is fully shown
            setTimeout(function () {
                clearInterval(timeoutID);
                timeoutID = window.setInterval(rotateTitle, 10000);
                
                $("#results").empty();
                $('#page').removeClass('hidden');
                window.scrollTo(0, scrollPosition);
                $('#toggle').removeClass('is-back');
                history.pushState("", document.title, window.location.pathname + window.location.search);

                $parallaxable = document.getElementsByClassName('parallaxable');
                parallaxableCount = $parallaxable.length;

                loader.hide();
            }, 1000);
        });
    } // reload

    loaderinit();

    revealOnScroll = function () {
            scrollTop = window.pageYOffset;
            c = scrollTop * 100 / win_height_padded;
            var opacity = 1; //global scroll opacity

            if (c < 80) {
                opacity = Math.round((c / 10)).toFixed(0);
            }

            if (!jQuery.browser.mobile) {
                $(".revealOnScroll:not(.animated)").each(function () {
                    var $this = $(this),
                        offsetTop = $this.offset().top;

                    if ((scrollTop + win_height_padded) > offsetTop + 200) {
                        if ($this.data('timeout')) {
                            window.setTimeout(function () {
                                $this.addClass('animated ' + $this.data('animation'));
                            }, parseInt($this.data('timeout'), 10));
                        } else {
                            $this.addClass('animated ' + $this.data('animation'));
                        }
                    }
                });

            }

            //check if first screen
            //if(c < 100){
            for (index = 0; index < parallaxableCount; index++) {
                var $item = $parallaxable[index];

                var currentDelta = $item.dataset.currentDelta;
                var newDelta = (0 - (scrollTop * $item.dataset.multiplier));

                var tweenDelta = Math.round(currentDelta - ((currentDelta - newDelta) * 0.08));

                if ($item.dataset.multiplier < 0)
                    tweenDelta = Math.abs(tweenDelta);

                transformString = "translateY(" + tweenDelta + "px) translateZ(0)";


                if ($item.dataset.rotation) {
                    transformString += " rotate(" + $item.dataset.rotation + ")";
                }
                if ($item.dataset.pita) {
                    pita = tweenDelta * Math.sqrt(2) / 2;
                    transformString += " translateX(" + pita + "px) ";
                }
                if ($item.dataset.skew) {
                    transformString += " skew(" + $item.dataset.skew + ")";
                }
                $item.style.transform = transformString;
                $item.style.webkitTransform = transformString;

                if ($item.dataset.fadeout == "true") {
                    $item.style.opacity = 1 - opacity / 10 * 2;
                    $item.style.opacity = 1 - opacity / 10 * 2;
                }

                // paralaxxed[i].style.transform = "translate3d(0px," + tweenDelta + "px, 0px)";
                $item.dataset.currentDelta = tweenDelta;
            }
            //}

            window.requestAnimationFrame(function () {
                revealOnScroll();
            });

        } // revealOnScroll


    updatePage = function () {
        window.requestAnimationFrame(function () {
            revealOnScroll();
        });
    }
    
    revealOnScroll();
    
    if (jQuery.browser.mobile) {
        $(".revealOnScroll:not(.animated)").each(function () {
            $(this).addClass('animated ' + $(this).data('animation'));
        });
    }
    //use an interval for the framrate for performancy
    //scrollIntervalID = setInterval(updatePage, 1e3 / 60);


    /*
    --------------------- Hash navigation -------------------------
    */
    //history.pushState("", document.title, window.location.pathname);

    if (window.location.hash) {

        url = $('*[data-hash="' + window.location.hash + '"]').attr('href');
        clearInterval(timeoutID);
        
        //loader.show(function () {
        $("#results").load(url, function () {
            $('#page').addClass('hidden');
            $('#toggle').addClass('is-back');
            window.scrollTo(0, 0);
            $parallaxable = ajaxContainer.getElementsByClassName('parallaxable');
            parallaxableCount = $parallaxable.length;
            loader.hide();
            
            $(".revealOnScroll:not(.animated)").each(function () {
                $(this).addClass('animated ' + $(this).data('animation'));
            });
        });
        //});
    } else {
        // Fragment doesn't exist
    }

    if (!jQuery.browser.mobile) {
        jQuery('body').on('click', 'a[href^="tel:"]', function () {
            jQuery(this).attr('href',
                jQuery(this).attr('href').replace(/^tel:/, 'callto:'));
        });
    }
    //implement back button navigation
    window.onpopstate = function (event) {
        if (event.state == "")
            reload();
    };
    /*
    ------------- PRE/LOADING ----------------*/
    loader.show();
    $(window).load(function () {
        setTimeout(function () {
            loader.hide();
            $('#loader').removeClass('preloading');
        }, 1000);
    });
});