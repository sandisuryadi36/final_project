$(".anchor").css("bottom", $(".nav").outerHeight() + 5)

//script to handle hamburger menu clicked
function toggleMenu() {
    $(".header").toggleClass("open")
    $(".overlay, .toggle-menu").fadeToggle("500ms")
    $("body").toggleClass("noScroll")
}

$("#btnHamburger").click(function () {
    
    //set top position and height
    if ($(window).scrollTop() >= $(".nav").outerHeight()) {       
        $(".overlay").css("top", $(window).scrollTop() + 5)
        $(".overlay").css("height", $(window).height() - $(".nav").outerHeight() - 5)
    } else {
        $(".overlay").css("top", $(".nav").outerHeight())
        $(".overlay").css("height", $(window).height() - $(window).scrollTop() - $(".nav").outerHeight())
    }

    //toggle the display
    toggleMenu()
})

//click empty space to toggle menu
$(".overlay").click(function () {
    if ($(".header").hasClass("open")) {
        toggleMenu()
    }
})

//scrolling page triger
$(window).scroll(navh = $(".nav").outerHeight(),function () {
    
    //script to handle sticky nav bar
    if ($(window).scrollTop() >= $(".nav").outerHeight()) {
        $(".nav").addClass("sticky-nav")
        $(".content").css("margin-top", navh)
    } else {
        $(".nav").removeClass("sticky-nav")
        $(".content").css("margin-top", 0)
    }

    //handle active menu effect
    if ($(window).scrollTop() + ($(window).height() / 2) >= $("#portfolio").offset().top) {
        $(".menu_link > *").removeClass("active")
        $("#mPortfolio").addClass("active")
    } else if ($(window).scrollTop() + ($(window).height() / 2) >= $("#skills").offset().top) {
        $(".menu_link > *").removeClass("active")
        $("#mSkills").addClass("active")
    } else if ($(window).scrollTop() + ($(window).height() / 2) >= $("#experience").offset().top) {
        $(".menu_link > *").removeClass("active")
        $("#mExperience").addClass("active")
    } else if ($(window).scrollTop() + ($(window).height() / 2) >= $("#about").offset().top) {
        $(".menu_link > *").removeClass("active")
        $("#mAbout").addClass("active")
    } else {
        $(".menu_link > *").removeClass("active")
        $("#mHome").addClass("active")
    }

})

//handle my age
var day = new Date().getDate()
var month = new Date().getMonth()
var year = new Date().getFullYear()
var d = new Date(month + "/" + day + "/" + year)
var dateBirth = new Date("03/01/1994")

var age = Math.floor((d.getTime() - dateBirth.getTime()) / (1000 * 3600 * 24 * 365))

$("#age").append(age + " years old")

//get pictures array from directory
$(function () {

    var baseUrl = "/assets/portfolio/"
    var pictures = []


    $.ajax({
        url: baseUrl,
        success: function (data) {
            pictures = []
            var i = 0
            $(data).find("a").each(function () {
                var href = $(this).attr('href')
                if (href.match(/\.(jpe?g|JPE?G|png|PNG|gif|GIF)$/)) {
                    pictures.push(href)
                    makeGrid(".grid-container", href, i)
                    i++
                }
            })
        }
    })

    //function to display to grid
    function makeGrid(container, link, i) {
        $(container).append("<div id='grid"+ i +"' clas='grid-item'></div>")
        $("#grid" + i).append("<div class='frame'><img src='"+ link +"'><span class'mobile-hide'></span></div>")
    }
});

//image clicked
var pWidth = 0

$(document).on("click", ".frame", function () {
    var imgURL = $(this).children("img").attr("src")

    $("body").append("<div class='preview'></div>")
    $(".preview").append("<img src='" + imgURL + "'>")
    $(".preview").fadeToggle(500)
    $("body").toggleClass("noScroll")
})

$(document).on("click", ".preview", function () {
    $(".preview").fadeToggle(500).queue(function () {
        $(".preview").remove()
        $(this).dequeue()
    })
    $("body").toggleClass("noScroll")
})

// //resize window function
// $(window).resize(function () {
//     if ($(window).width() < pWidth + 100) {
//         $(".preview").children("img").css("width", $(window).width() - 100)
//     } else {
//         $(".preview").children("img").css("width", "auto")
//     }
// })