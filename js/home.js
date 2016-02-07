jQuery.extend(jQuery.easing, {
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
});

jQuery(document).ready(function () {
    var stashClasses = new Array("classic", "chinese", "redneck");
    var stash = 0;
    $("#about figure").mouseenter(function (e) {
        $(this).addClass(stashClasses[stash]);
        if (stash <= 1)
            stash++;
        else
            stash = 0;
        console.log(stash);
    });

    $("#about figure").mouseleave(function (e) {
        $(this).removeAttr("class");
    });

    /*
    ------------- Somooth scroll down on hint click ----------------
    */

    $('.scroll-down').on("click", function (e) {
        e.preventDefault();

        $('nav').removeClass('is-open');
        $('#menu-push').removeClass('is-open');

        $destination = $($(this).attr('href')).offset().top - 200;

        $('html,body').animate({
            scrollTop: $destination
        }, 2000, "easeOutCirc");

        console.log($destination);

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

                $('#square').removeClass('is-open');
                $('#letter-push').removeClass('is-open');
            } else {
                $('nav').addClass('is-open');
                $('#menu-push').addClass('is-open');
                $('#square').addClass('is-open');
                $('#letter-push').addClass('is-open');
            }
        }
    });
    /*
    ------------- TODO NAVIGATION ----------------
        hide menu once scroll goes to item
    */
    /*
    ------------- TODO When scrolled all way to bottom do as on android hint ----------------
       
    */
    var scrollPosition = 0,
        $window = $(window),
        scrollTop = window.pageYOffset,
        win_height_padded = $window.height() * 1.1,
        win_width_padded = $window.width() * 1.1,
        square = document.getElementById('square');

    var $parallaxable = document.getElementsByClassName('parallaxable'),
        ajaxContainer = document.getElementById('results'),
        parallaxableCount = $parallaxable.length;

    /**/
    var pageWrap = document.getElementById('page'),
        pages = [].slice.call(pageWrap.querySelectorAll('div.container')),
        currentPage = 0,
        triggerLoading = [].slice.call(pageWrap.querySelectorAll('a.pageload-link')),
        loader = new SVGLoader(document.getElementById('loader'), {
            speedIn: 100
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

            /* Showed...*/
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

            if (!jQuery.browser.mobile) {
                if (c > square.dataset.secondStep) {
                    $(square).addClass('second-pos');
                } else
                    $(square).removeClass('second-pos').removeAttr('style');

                if (c > square.dataset.thirdStep) {
                    $(square).addClass('third-pos');
                } else
                    $(square).removeClass('third-pos');
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
                    pita = tweenDelta * Math.sqrt(2) / 2;
                    transformString += " rotate(" + $item.dataset.rotation + ") translateX(" + pita + "px) ";
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
    //use an interval for the framrate for performancy
    //scrollIntervalID = setInterval(updatePage, 1e3 / 60);


    initSquare = function () {
        square.dataset.secondStep = ($('#about').offset().top + $('#about').height() / 2) * 50 / win_height_padded;
        square.dataset.thirdStep = ($('#process').offset().top + $('#process').height() / 2) * 50 / win_height_padded * 1.2;
        //initialize the square jump values
        $("<style>#square.second-pos {left : " + ($('#about article').offset().left - 80) + "px} #square.third-pos{top:" + ($('#process').offset().top - 550) + "px; left:102%;}</style>").appendTo("head");
    }

    $window[0].onresize = function () {
        initSquare()
    };

    initSquare();

    /*
    --------------------- Hash navigation -------------------------
    */

    //history.pushState("", document.title, window.location.pathname);

    if (window.location.hash) {
        
        url = $('*[data-hash="' + window.location.hash + '"]').attr('href');
        //loader.show(function () {
            $("#results").load(url, function () {
                $('#page').addClass('hidden');
                $('#toggle').addClass('is-back');
                window.scrollTo(0, 0);
                $parallaxable = ajaxContainer.getElementsByClassName('parallaxable');
                parallaxableCount = $parallaxable.length;
                loader.hide();
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
    ------------- PRE/LOADING ----------------
    
    loader.show(function(){
        //once the loader is fully shown
        $(window).load(function(){ 
            loader.hide();
        });
    });*/
});

/*
jQuery(document).ready(function(){
    var $hero = $('#hero'),
    $window = $(window),
    $menu = $('#site-header'),
    win_height_padded = $window.height() * 1.1,
    win_width_padded = $window.width() * 1.1;
    
    var height = $window.height();
    
    $('#primary article:not(.expoze)').each(function(index, value){
        if(index < 3)
            $(this).css('height',height*0.8+'px');
        else
            $(this).css('height',height*0.7+'px');
    });
    
    $('#primary').css('margin-top',height+'px');
    $hero.css('height',height+'px');
    
    
    var $expoze = $('#expoze');
    
    var $parallaxable = document.getElementsByClassName('parallaxable');
    var parallaxableCount = $parallaxable.length;
    
    revealOnScroll = function(){
        //$(window).on('scroll', function (e) {
            var scrollTop = window.pageYOffset;
           
            c = scrollTop*100/win_height_padded;
            
            //$hero.css('top','-'+Math.round(scrolled/3)+'px');    

            if(scrollTop>height-height*2/10 && $menu.hasClass('active')==false)
                $menu.addClass('active');
            if(scrollTop<height-height*2/10 && $menu.hasClass('active')==true)
                $menu.removeClass('active');
            
            var opacity = 1; //global scroll opacity
            
            if(c<80){
                opacity= Math.round((c/10)).toFixed(0);
                $menu.css('background','rgba(0,0,0,0.'+opacity.charAt(0)+')');
            }

            /* Showed...*
            $(".revealOnScroll:not(.animated)").each(function () {
                var $this     = $(this),
                    offsetTop = $this.offset().top;

                if ((scrollTop + win_height_padded) > offsetTop+200) {
                    if ($this.data('timeout')) {
                        window.setTimeout(function(){
                        $this.addClass('animated ' + $this.data('animation'));
                        }, parseInt($this.data('timeout'),10));
                    } else {
                        $this.addClass('animated ' + $this.data('animation'));
                    }
                }
              });
            
            //check if first screen
            //if(c < 100){
                for(index =0 ; index < parallaxableCount; index++ ){
                    var $item = $parallaxable[index];
                    var currentDelta = $item.dataset.currentDelta;
                    var newDelta = (0 - (scrollTop * $item.dataset.multiplier));
                    var tweenDelta = Math.round(currentDelta - ((currentDelta - newDelta) * 0.08));
                    
                    $item.style.transform = "translateY(" + tweenDelta + "px) translateZ(0)";
                    $item.style.webkitTransform = "translateY(" + tweenDelta + "px) translateZ(0)"; 
                    
                    if($item.dataset.fadeout == "true"){
                        $item.style.opacity = 1-opacity/10*2;
                        $item.style.opacity = 1-opacity/10*2; 
                    }
                        
                    // paralaxxed[i].style.transform = "translate3d(0px," + tweenDelta + "px, 0px)";
                    $item.dataset.currentDelta = tweenDelta;
                }
            //}
        //});
    }
   
    
    updatePage = function() {
         window.requestAnimationFrame(function() {
          revealOnScroll();
      });   
    }
     scrollIntervalID = setInterval(updatePage, 1e3 / 60);
    
    
    //window.requestAnimationFrame(revealOnScroll);
    
    //if (isTouch) { $('.revealOnScroll').addClass('animated'); }
    //$window.on('scroll', revealOnScroll);

              
});*/