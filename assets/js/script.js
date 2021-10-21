$(".anchor").css("bottom", $(".nav").outerHeight() + 5)

//select size of reCaptcha
function captchaSize(width) {
    if (width < 640) {
        $(".g-recaptcha").attr("data-size","compact")
    } else {
        $(".g-recaptcha").attr("data-size","normal")
    }
}

captchaSize($(window).width())
$(window).resize(function(){
    captchaSize($(window).width())
})
//========================

//menu click behavior
$(".menuBtn").on("click", function () {
    var target = $(this).attr("scroll-to")
    if (target == "#") {
        document.querySelector("html").scrollIntoView({ behavior: "smooth", block : "start" })
    } else {
        document.querySelector(target).scrollIntoView({ behavior: "smooth", block : "start" })
    }
})

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
    if ($(window).scrollTop() + ($(window).height() / 2) >= $("#contact").offset().top) {
        $(".menu_link > *").removeClass("active")
        $("#mContact").addClass("active")
    } else if ($(window).scrollTop() + ($(window).height() / 2) >= $("#portfolio").offset().top) {
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

    //close preview if active
    if ($(".preview").length == 1) {
        closePreview()
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


$(function () {
    
//=======DO NOT DELETE==============
//get pictures array from directory
//just use this in local server to take the file list in folder, then copy to json file
//     var baseUrl = "/assets/portfolio/"
//     var pictures = []


//     $.ajax({
//         url: baseUrl,
//         success: function (data) {
//             pictures = []
//             $(data).find("a").each(function () {
//                 var href = $(this).attr('href')
//                 if (href.match(/\.(jpe?g|JPE?G|png|PNG|gif|GIF)$/)) {
//                     pictures.push(href)
//                     // makeGrid(".grid-container", href)
//                 }
//             })
//             console.log(pictures)
//         }
//     })
//=======DO NOT DELETE==============

    $.getJSON("../assets/portfolio/list.json", function (result) {
        $.each(result, function (_, data) {
            makeGrid(".grid-container", data)
        })
    })

    //function to display to grid
    function makeGrid(container, link) {
        $(container).append("<div class='grid-item'><img src='" + link + "'><span class'mobile-hide'></span></div>")
    }
});

//function to preview img
function displayPreview(link) {
    $("body").append("<div class='preview'></div>")
    $(".preview").append("<img src='" + link + "'>")
    $(".preview").fadeToggle(500)
}

function closePreview() {
    $(".preview").fadeToggle(500).queue(function () {
        $(".preview").remove()
        $(this).dequeue()
    })
}

$(document).on("click", ".preview", function () {
    closePreview()
})

$(document).on("click", "#angin", function () {
    var link = "./assets/images/Sertifikat-Angin-Photoschool.jpg"
    displayPreview(link)
})

$(document).on("click", "#certivicate", function () {
    var link = "./assets/images/Sertifikat-Kompetensi-LESKOFI-lv-3.jpg"
    displayPreview(link)
})

//image clicked
$(document).on("click", ".grid-item", function () {
    var imgURL = $(this).children("img").attr("src")
    displayPreview(imgURL)
})
