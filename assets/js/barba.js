import barba from "@barba/core";
import gsap from "gsap";
import Swiper from 'swiper';

import { parameters } from './swiper';

export default class Barba {
  constructor(mySwiper, MyScene) {
    this.mySwiper = mySwiper;
    this.MyScene = MyScene;
    this.init();
  }

  init() {
    const that = this;
    barba.init({
      transitions: [{
        name: 'opacity-transition',
        leave(data) {
          const done = this.async();
  
          gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              done();
            }
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              if(data.next.namespace === "home") {
                const swiper = new Swiper('.swiper-container', parameters);
                that.MyScene.setMySwiper(swiper);
              }
            }
          });
        }
      }]
    })
  }

}
