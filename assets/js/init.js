import Scene from './app.js';
import mouse from './mouse.js';
import Barba from './barba.js';
import mySwiper from './swiper.js';

const myScene = new Scene(document.querySelectorAll('.background__img'));
myScene.setMySwiper(mySwiper);

new Barba(mySwiper, myScene);

const menuMobile = document.querySelector('.header');
let tobbleMuenu = true;
document.querySelector('.header-mobile__link').addEventListener("click", function(e) {
    menuMobile.style.display = tobbleMuenu === false ? "none" : "block";
    tobbleMuenu = !tobbleMuenu;
});