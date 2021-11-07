$(".anchor").css("bottom", $(".nav").outerHeight() + 5)
let navh = $(".nav").outerHeight()
// $(".content").css("margin-top", navh)

//select size of reCaptcha
if ($(window).width() < 640) {
    $(".g-recaptcha").attr("data-size", "compact")
} else {
    $(".g-recaptcha").attr("data-size", "normal")
}
//========================

//menu click behavior
$(".menuBtn").on("click", function () {
    let target = $(this).attr("scroll-to")
    if (target == "#") {
        focusView("html")
    } else {
        focusView(target)
    }
})

function focusView(queryTarget) {
    document.querySelector(queryTarget).scrollIntoView({ behavior: "smooth", block: "start" })
}

//script to handle hamburger menu clicked
function toggleMenu() {
    $(".header").toggleClass("open")
    $(".overlay, .toggle-menu").fadeToggle("500ms")
    $("body").toggleClass("noScroll")
}

$(document).on("click", "#btnHamburger", function () {

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
$(document).on("click", ".overlay", function () {
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

    //paralax handler
    let scrollTop = $(window).scrollTop()
    let nameHead = $(".greating")
    let camera1 = $(".image-item:nth-child(1)")
    let camera2 = $(".image-item:nth-child(2)")
    let camera3 = $(".image-item:nth-child(3)")

    paralax(nameHead, 20)
    paralax(camera1,5)
    paralax(camera2, -6)
    paralax(camera3, 3)
    
    function paralax(target, depht) {
        target.css({
            "transform" : "translate(0, "+ scrollTop/depht * -1 +"%)"
        })
    }
    
})

//handle my age
let day = new Date().getDate()
let month = new Date().getMonth()
let year = new Date().getFullYear()
let d = new Date(month + "/" + day + "/" + year)
let dateBirth = new Date("03/01/1994")

let age = Math.floor((d.getTime() - dateBirth.getTime()) / (1000 * 3600 * 24 * 365))

$("#age").append(age + " years old")


//Loading iamge handler ===============

let imgCount = 0  //count of all img
let perLoad = 5     //max image grid load at once
let loaded = 0      //count loaded img
let categoryActive = ""
let data

$("#product").on("click", function () {
    imgCount = 0
    loaded = 0
    categoryActive = "product"
    loadData("product")
    $("#product").addClass("active")
    $("#portrait").removeClass("active")
})

$("#portrait").on("click", function () {
    imgCount = 0
    loaded = 0
    categoryActive = "portrait"
    loadData("portrait")
    $("#portrait").addClass("active")
    $("#product").removeClass("active")
})

function loadData(category) {
    $.ajax({
        url: "../node/list.json",
        success: function (jsonData) {

            switch (category) {
                case "product":
                    data = jsonData.product
                    break
                case "portrait":
                    data = jsonData.portrait
                    break
            }

            if ($(".grid-container").length == 1) {
                $(".grid-container").slideUp(700, function () {
                    $(".grid-container").remove()
                    $("#load-btn").remove()

                    display()
                })
            } else {
                display()
            }
        }
    })
}

function display() {
    $("<div class='grid-container flex-jc-c flex-row'></div>").insertAfter($("#" + categoryActive))

    imgCount = data.length
    loadGrid(loaded, perLoad, data)
    $(".grid-container").slideDown(700, function () {
        if (imgCount > loaded) {
            $("<button id='load-btn'>Load more...</button>").insertAfter(".grid-container")
        }
    })
    $(".grid-container").css("display", "flex")
    
    $("#load-btn").on("click", function () {
        let i = imgCount - loaded
        if (i > perLoad) {
            loadGrid(loaded, loaded + perLoad, data)
        } else {
            loadGrid(loaded, loaded + i, data)
            $("#load-btn").remove()
        }
    })
}

function loadGrid(iloaded, iperload, idata) {
    for (let i = iloaded; i < iperload; i++) {
        makeGrid(".grid-container", idata[i], i)
        loaded++
    }
}

//function to display to grid
function makeGrid(container, link, i) {
    $(container).append("<div class='grid-item'><img class='grid-img' src='" + link + "' loading='lazy' index='" + i + "' oncontextmenu='return false;'><span clas='mobile-hide'></span></div>")
}

//========load image handler

//function to preview img
function displayPreview(data, i) {
    $("body").append("<div class='preview'></div>")
    $(".preview").append("<div class='backlayer'></div>")
    if (i != null) {    //with i parameter
        $(".preview").append("<img class='preview-img' src='" + data[i] + "' index='" + i + "' oncontextmenu='return false;'>")

        $(".preview").append("<div class='navigation flex flex-row flex-jc-sb'></div>")
        $(".navigation").append("<div class='nav-left flex flex-column flex-jc-c flex-ai-c'><span></span><span></span></div>")
        $(".navigation").append("<div class='nav-right flex flex-column flex-jc-c flex-ai-c'><span></span><span></span></div>")
    } else {    //without i parameter
        $(".preview").append("<img class='preview-img' src='" + data + "' oncontextmenu='return false;'>")
    }

    $(".preview").append("<div id='close-preview'><span></span><span></span></div>")

    $(".preview").fadeToggle(500)
    $("html").toggleClass("noScroll")
}

function closePreview() {
    $(".preview").fadeToggle(500).queue(function () {
        $(".preview").remove()
        $("html").toggleClass("noScroll")
        $(this).dequeue()
    })
}

//preview navigation ================
$(document).on("swipeleft", ".preview", function () { nextPrev() })
$(document).on("swiperight", ".preview", function () { backPrev() })

$(document).on("click", ".nav-left", function () { backPrev() })
$(document).on("click", ".nav-right", function () { nextPrev() })

$(document).keydown(function (e) {
    if (e.keyCode == 37) {
        backPrev()
    } else if (e.keyCode == 39) {
        nextPrev()
    }
});

$(document).on("click", "#close-preview", function () {
    closePreview()
})

$(document).on("click", ".backlayer", function () {
    closePreview()
})

function nextPrev() {
    let i = parseInt($(".preview-img").attr("index"))
    if (i < loaded - 1) {
        changeIMG("next", i)
    } else if ((i == loaded - 1) && (loaded != data.length)) {
        if (confirm("Do you want to load more photos?")) {
            let x = imgCount - loaded
            if (x > perLoad) {
                loadGrid(loaded, loaded + perLoad, data)
            } else {
                loadGrid(loaded, loaded + x, data)
                $("#load-btn").remove()
            }
            changeIMG("next", i)
        }
    }
}

function backPrev() {
    let i = parseInt($(".preview-img").attr("index"))
    changeIMG("back", i)
}

function changeIMG(x, i) {
    if (x == "next") {
        $(".preview-img").toggleClass("swipe-left")
        $(".preview-img").fadeToggle(300).queue(function () {
            $(".preview-img").toggleClass("swipe-left")
            $(".preview-img").attr("src", data[i + 1])
            $(".preview-img").ready(function () {
                $(".preview-img").fadeToggle(300)
                $(".preview-img").attr("index", i + 1)
            })
            $(this).dequeue()
        })
    } else if (x == "back") {
        if (i > 0) {
            $(".preview-img").toggleClass("swipe-right")
            $(".preview-img").fadeToggle(300).queue(function () {
                $(".preview-img").toggleClass("swipe-right")
                $(".preview-img").attr("src", data[i - 1])
                $(".preview-img").ready(function () {
                    $(".preview-img").fadeToggle(300)
                    $(".preview-img").attr("index", i - 1)
                })
                $(this).dequeue()
            })
        }
    }
}

//============= preview navigation end

$(document).on("click", "#angin", function () {
    let link = "./assets/images/Sertifikat-Angin-Photoschool.webp"
    displayPreview(link)
})

$(document).on("click", "#certivicate", function () {
    let link = "./assets/images/Sertifikat-Kompetensi-LESKOFI-lv-3.webp"
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
    let imgIndex = $(this).children(".grid-img").attr("index")
    displayPreview(data, imgIndex)
})