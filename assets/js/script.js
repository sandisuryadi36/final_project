const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const fadding = document.querySelector('.overlay');
const body = document.querySelector('body');

btnHamburger.addEventListener('click', function(){
    console.log('button hamburger clicked')

    if(header.classList.contains('open')){
        fadding.classList.remove('fade-in');
        fadding.classList.add('fade-out');
        header.classList.remove('open');
        body.classList.remove('noScroll');
        
    } else {
        header.classList.add('open');
        fadding.classList.remove('fade-out');
        fadding.classList.add('fade-in');
        body.classList.add('noScroll');
    }
})