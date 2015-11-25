jQuery(document).ready(function(){
    var stashClasses = new Array("classic","chinese","redneck");
	var stash = 0;
    $("#about figure").mouseenter(function(e){
        $(this).addClass(stashClasses[stash]);
        if(stash <= 1)
            stash++;
        else
            stash = 0;
        console.log(stash);
    });

    $("#about figure").mouseleave(function(e){
        $(this).removeAttr("class");
    });
});/*
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