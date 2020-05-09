import Swiper from 'swiper';

const sizeW = window.innerWidth;

export const parameters = {
    direction: 'vertical',
    height: sizeW < 960 ? 200 : 300,
    watchSlidesVisibility: true,
    centeredSlides: true,
    shortSwipes: false,
    longSwipes: false,
    touchRatio: 0.9,
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
}

const mySwiper = new Swiper('.swiper-container', parameters);

export default mySwiper;