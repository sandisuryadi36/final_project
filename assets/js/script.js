//script to handle hamburger menu clicked
$("#btnHamburger").click(function() {
    console.log('button hamburger clicked')
    console.log('nav menu height ' + $(".nav").outerHeight())
    console.log('nav window offset ' + $(window).scrollTop())
    
    if ($(window).scrollTop() >= $(".nav").outerHeight()) {       
        $(".overlay").css("top", $(window).scrollTop() + 5)
        $(".overlay").css("height", $(window).height() - $(".nav").outerHeight() - 5)
    } else {
        $(".overlay").css("top", $(".nav").outerHeight())
        $(".overlay").css("height", $(window).height() - $(window).scrollTop() - $(".nav").outerHeight())
    }

    if ($(".header").hasClass("open")) {
        $(".header").toggleClass("open")
        $(".overlay").removeClass("fade-in")
        $(".overlay").addClass("fade-out")
        $(".toggle-menu").removeClass("fade-in")
        $(".toggle-menu").addClass("fade-out")
        $("body").toggleClass("noScroll")
    } else {
        $(".header").toggleClass("open")
        $(".overlay").addClass("fade-in")
        $(".overlay").removeClass("fade-out")
        $(".toggle-menu").addClass("fade-in")
        $(".toggle-menu").removeClass("fade-out")
        $("body").toggleClass("noScroll")
    }
})

//script to handle sticky nav bar
$(window).scroll(navh = $(".nav").outerHeight(),function () {
    console.log("scolled " + $(window).scrollTop())
    console.log('margin top ' + navh)

    if ($(window).scrollTop() >= $(".nav").outerHeight()) {
        console.log("sticky")
        $(".nav").addClass("sticky-nav")
        $(".content").css("margin-top", navh)
    } else {
        $(".nav").removeClass("sticky-nav")
        $(".content").css("margin-top", 0)
    }
})