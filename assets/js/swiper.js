import Swiper from 'swiper';
//import 'swiper/css/swiper.min.css';

const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination',
    },
    height: 200,
    watchSlidesVisibility: true
});

export default mySwiper;