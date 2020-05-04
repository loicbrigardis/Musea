import Scene from './app.js';
import mouse from './mouse.js';
import Barba from './barba.js';
import mySwiper from './swiper.js';

const myScene = new Scene(document.querySelectorAll('.background__img'));
myScene.setMySwiper(mySwiper);

new Barba(mySwiper, myScene);