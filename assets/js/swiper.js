import Swiper from 'swiper';
//import 'swiper/css/swiper.min.css';

const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination',
    },
    height: 280,
    watchSlidesVisibility: true,
    freeModeSticky: true,
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    resistanceRatio: 0.5
});

export default mySwiper;