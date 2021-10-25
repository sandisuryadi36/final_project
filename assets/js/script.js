$(".anchor").css("bottom", $(".nav").outerHeight() + 5)
var navh = $(".nav").outerHeight()
$(".content").css("margin-top", navh)

//select size of reCaptcha
if ($(window).width() < 640) {
    $(".g-recaptcha").attr("data-size","compact")
} else {
    $(".g-recaptcha").attr("data-size","normal")
}
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
        $(".overlay").css("top", $(window).scrollTop())
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
$(window).scroll(navh, function () {
    
    //script to handle sticky nav bar
    if ($(window).scrollTop() >= $(".nav").outerHeight()) {
        $(".nav").addClass("sticky-nav")
    } else {
        $(".nav").removeClass("sticky-nav")
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
// =======DO NOT DELETE==============
// get pictures array from directory
// just use this in local server to take the file list in folder, then copy to json file
    // var baseUrl = "/assets/portfolio/"
    // var pictures = []


    // $.ajax({
    //     url: baseUrl,
    //     success: function (data) {
    //         pictures = []
    //         $(data).find("a").each(function () {
    //             var href = $(this).attr('href')
    //             if (href.match(/\.(jpe?g|JPE?G|png|PNG|gif|GIF|webp|WEBP)$/)) {
    //                 pictures.push(href)
    //             }
    //         })
    //         console.log(pictures)
    //     }
    // })
// =======DO NOT DELETE==============
});

//Loading iamge handler ===============
$.ajaxSetup({
    async: false
});

var jsonData = (function () {
    var result;
    $.ajax({
        url: "../assets/portfolio/list.json",
        success: function (data) {
            result = data
        }
    })
    return result;
})();

var imgCount = jsonData.length
var perLoad = 6     //max image grid load at once
var loaded = 0

loadGrid(loaded, perLoad)

if (imgCount > loaded) {
    $("<button id='load-btn'>Load more...</button>").insertBefore("#contact")
}

$("#load-btn").on("click", function () {
    var i = imgCount - loaded
    if (i > perLoad) {
        loadGrid(loaded, loaded + perLoad)
    } else {
        loadGrid(loaded, loaded + i)
        $("#load-btn").remove()
    }
})

function loadGrid(e, x) {
    for (var i = e; i < x; i++){
        makeGrid(".grid-container", jsonData[i])
        loaded++
    }
}

//function to display to grid
function makeGrid(container, link) {
    $(container).append("<div class='grid-item'><img class='grid-img' src='"+ link +"' loading='lazy'><span clas='mobile-hide'></span></div>")
}

//========load image handler

//function to preview img
function displayPreview(link) {
    $("body").append("<div class='preview'></div>")
    $(".preview").append("<div class='preview-img' style='background-image: url("+ link +");'></div>")
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
    var link = "./assets/images/Sertifikat-Angin-Photoschool.webp"
    displayPreview(link)
})

$(document).on("click", "#certivicate", function () {
    var link = "./assets/images/Sertifikat-Kompetensi-LESKOFI-lv-3.webp"
    displayPreview(link)
})

$(document).on("focus", "#leave-message", function () {
    $("#ms-form").fadeToggle(500)
    $("#form-name").focus()
    $("body").toggleClass("noScroll")
})

$(document).on("click", "#close-form", function () {
    $("#ms-form").fadeToggle(500)
    $("body").toggleClass("noScroll")
})

//image clicked
$(document).on("click", ".grid-item", function () {
    var imgURL = $(this).children(".grid-img").attr("src")
    displayPreview(imgURL)
})
