const btnHamburger = document.querySelector('#btnHamburger')
const header = document.querySelector('.header')
const fadding = document.querySelector('.overlay')
const body = document.querySelector('body')
const toggle = document.querySelector('.toggle-menu')
const nav = document.querySelector('.nav')

//script wen hamburger button clicked
btnHamburger.addEventListener('click', function(){
    console.log('button hamburger clicked')

    //set overlay position and height
    if (window.pageYOffset >= menu_h) {
        document.querySelector('.overlay').style.top = 5+ window.pageYOffset + menu_h + "px"
        document.querySelector('.overlay').style.height = "calc(100vh - 5px - " + menu_h + "px)"
    } else {
        document.querySelector('.overlay').style.top = menu_h + "px"
        document.querySelector('.overlay').style.height = "calc(100vh - " + menu_h + "px + " + window.pageYOffset + "px)"
    }
    
    //handle animation class
    if (header.classList.contains('open')) {
        fadding.classList.remove('fade-in')
        fadding.classList.add('fade-out')
        header.classList.remove('open')
        body.classList.remove('noScroll')
        toggle.classList.remove('fade-in')
        toggle.classList.add('fade-out')
        
    } else {
        header.classList.add('open')
        fadding.classList.remove('fade-out')
        fadding.classList.add('fade-in')
        body.classList.add('noScroll')
        toggle.classList.add('fade-in')
        toggle.classList.remove('fade-out')
    }
})

//script for handling sticky nav
window.onscroll = function () { sticky_nav() }

var menu_h = nav.offsetHeight

function sticky_nav() {
    if (window.pageYOffset >= menu_h) {
        nav.classList.add('sticky-nav')
    } else {
        nav.classList.remove('sticky-nav')
    }
}