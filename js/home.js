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
    });

    $("#about figure").mouseleave(function (e) {
        $(this).removeAttr("class");
    });

    $("#hero h1").on("hover", "span",function(e){
        $("#title").addClass("active");
    });
    $("#title").mouseleave(function(){
        $("#title").removeClass("active");            
    });
    var newText = new Array;
    var rotatingIndex = 1;
    
    newText['product-designer'] = "A digital <span>product designer <i class=\"line\"></i></span>  based in London. Turning complex processes into simple, meaningful and engaging experiences is what I do.<a href=\"#readmore\" title=\"Dsicover more about y experience and how I work\">Read more</a>";
    
    newText['problem-solver'] = "A skilled <span>problem solver<i class=\"line\"></i></span> with the heart of a designer and the mind of an engineer.I trust that a good process will always lead to good outcomes.<a href=\"#readmore\" title=\"Dsicover more about y experience and how I work\">Read more</a>";
    
    newText['spceialist-generalist'] = " A good <span>spceialist-generalist <i class=\"line\"></i></span> with a wide range of design skills. Fluid in design thinking, user experience and interaction design.<a href=\"#readmore\" title=\"Dsicover more about y experience and how I work\">Read more</a>";
    
    newText['unicorn-designer'] = "A magic <span>unicorn designer <i class=\"line\"></i></span> that eats challanges and poops elegant solutions. Running wild trough the meadows where function and delight intersect.<a href=\"#readmore\" title=\"Dsicover more about y experience and how I work\">Read more</a>";
    
    
    $("#title a").each(function(){
        $(this).click(function(){
            var mme=$(this).attr('href').substring(1);
            $("#hero h1").fadeOut(300,function(){
                $(this).html(newText[mme]).fadeIn(300,function(){
                    $("#hero .line").addClass("active");
                    clearInterval(timeoutID);
                    timeoutID = window.setInterval(frame, 30000);
                });
            })
            rotatingIndex =  $("#title a").index(this);
            
            $("#title").removeClass("active"); 
            $("#hero").removeClass("product-designer problem-solver spceialist-generalist unicorn-designer").addClass(mme);
           
        }); 
    });
    $("#hero .line").addClass("active");
     
    function frame(){
        $("#hero .line").removeClass("active");
        
        if(rotatingIndex<3)
        rotatingIndex++;
        else
            rotatingIndex = 0;
        
        $("#title a").get(rotatingIndex).click();
    };
    
    var timeoutID = window.setInterval(frame, 30000);
    
    /*
    ------------- Somooth scroll down on hint click ----------------
    */
    $('.scroll-down').on("click", function (e) {
        e.preventDefault();

        $('nav').removeClass('is-open');
        $('#menu-push').removeClass('is-open');
        
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
    ------------- PRE/LOADING ----------------*/
    loader.show();
    $(window).load(function () {
        setTimeout(function () {
            loader.hide();
            $('#loader').removeClass('preloading');
        }, 1000);
    });
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