/*
    created by : KevinKP
    23 March 2015
    Purpose : a hideable sticky header collaborate with CSS3 as the animation base.
    This is my first time to create this
    so be nice and take care.
 */

(function($){
    /*
        DEFINE ANYTHING HERE
     */


    var $head = $('head');

    var defaults = {
        scroll : true,
        toggle : false,
        reverse: false,
        anchor : 100,
        speed : 300,
        toggleBtn: '.pull'
    };

    /*
        THE INITIAL FUNCTIONS
     */
    $.fn.stickyMenu = function(options){

        if( options === undefined || typeof options === "object") {
            $(this).each(function () {
                var rz,
                    $menuHeight;
                var $fn = $(this);
                var $class = $fn[0].className;
                var $opts = $.extend({}, defaults, options);

                if(typeof $opts.anchor !== "number"){
                    var anc = $($opts.anchor);
                    if(anc.length != 0)
                    {
                        $opts.anchor = anc.offset().top;
                    }else
                    {
                        console.error("the anchor selector not exist!");
                    }
                }

                if($opts.reverse == false)
                {
                    $fn.addClass("in");
                }

                $(window).resize(function () {
                    clearTimeout(rz);
                    rz = setTimeout(function () {
                        $menuHeight = $fn.outerHeight();
                        addCss($class, $opts, $menuHeight);
                    }, 100);
                });

                //initial load
                $menuHeight = $fn.outerHeight();
                addCss($class, $opts,$menuHeight);
                onScroll($fn, $opts,$menuHeight);
                onToggle($fn, $opts);
            });
        }else
        {
            $(this).removeData();
        }
    };

    /*
        ADDING THE CSS
        * i made in the css to ensure a better animation from CSS3
        * you can add the animation attribute all you want just by adding in the CSS
     */
    var addCss = function($class, $opts,$menuHeight){

        var men,
            menA,
            dis;

        if($opts.reverse == true)
        {
            men = "-" + $menuHeight + "px;";
            menA = "0;";
        }else
        {
            men = "0;";
            menA = "-" + $menuHeight + "px;";
        }

        var menu = "."+$class+"{" +
            "position:fixed;" +
            "z-index: 10;" +
            "display: none;" +
            "top: " + men +
            "transition : all "+ $opts.speed +"ms linear;"+
            "-webkit-transition : all "+ $opts.speed +"ms linear;"+
            "}";

        var custom = "."+$class+" *{" +
            "transition : all "+ $opts.speed +"ms linear;"+
            "-webkit-transition : all "+ $opts.speed +"ms linear;"+
            "}";

        var menuActive = "."+$class+".active{" +
            "top: " + menA +
            "}";

        var menuIn = "."+$class+".in{" +
            "display: block;" +
            "}";

        var closure = "<style>"+ menu +" "+ menuActive +" " + menuIn +" "+ custom +"</style>";

        $head.append(closure);
    };

    var onScroll = function($fn, $opts, $menuHeight){
        if($opts.scroll == true)
        {
            $(window).scroll(function(){
                var scroll = $(this).scrollTop();
                var sResult = $opts.anchor - $menuHeight > 0 ?  $opts.anchor - $menuHeight : 0;
                if( scroll > sResult )
                {
                    $fn.addClass("in");
                    setTimeout(function(){
                       $fn.addClass("active");
                    },10);
                }else
                {
                    $fn.removeClass("active");
                    setTimeout(function(){
                        $fn.addClass("in");
                    },$opts.speed);
                }
            });
        }
    };

    var onToggle = function($fn, $opts){
        if($opts.toggle == true)
        {
            var $btn = $($opts.toggleBtn);
            $btn.on("click",function(){
                $fn.toggleClass("active");
            });
        }
    }

}(jQuery));
