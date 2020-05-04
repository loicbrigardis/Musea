import Swiper from 'swiper';

export const parameters = {
    direction: 'vertical',
    height: 250,
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