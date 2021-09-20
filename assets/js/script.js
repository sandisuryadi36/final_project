const btnHamburger = document.querySelector('#btnHamburger');
const Header = document.querySelector('.header');

btnHamburger.addEventListener('click', function(){
    console.log('button hamburger clicked')

    if(Header.classList.contains('open')){
        Header.classList.remove('open');
    } else {
        Header.classList.add('open');
    }
})