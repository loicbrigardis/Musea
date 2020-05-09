import barba from "@barba/core";
import gsap from "gsap";
import Swiper from 'swiper';
import SplitTextJS from 'split-text-js';
import jsonData from "../bd/data.json";

import { parameters } from './swiper';

export default class Barba {
  constructor(mySwiper, MyScene) {
    this.mySwiper = mySwiper;
    this.MyScene = MyScene;
    this.slideActive = 0;
    this.init();
  }

  _generateHTML(parent,selector, html) {
    parent.querySelector(selector).innerHTML = html;
  }

  _generateHTMLContent(data) {
    const activeSlide = data.next.container;
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('p') - 1;
    let id = parseInt(myParam);
    this._generateHTML(activeSlide, ".main__title", jsonData[id].title);
    this._generateHTML(activeSlide, ".main__date", jsonData[id].date);
    this._generateHTML(activeSlide, ".page-content", jsonData[id].description);
    return id;
  }

  defaultPage() {
    const that = this;
    return {
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
      beforeEnter(data) {
        if(data.next.namespace === "home") {
          const swiper = new Swiper('.swiper-container', parameters);
          if(data.current.url.query.p) {
            that.MyScene.setIndexCurrent(data.current.url.query.p - 1);
          }
          that.MyScene.setMySwiper(swiper);
        }
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.4,
        });
      },
    }
  }

  toPage() {
    const that = this;
    return {
      name: 'custom-transition',
      to: {
        namespace: [
          'page'
        ]
      },
      once(data) {
        let id = that._generateHTMLContent(data);
        that.MyScene.setIndexCurrent(id);
        that.slideActive = id;
      },
      beforeEnter(data) {
        that._generateHTMLContent(data);
      },
      enter(data) {
        const activeSlide = data.next.container;
        const title = activeSlide.querySelector('.main__title');
        const date = activeSlide.querySelector('.main__date');
        const paragraphes = activeSlide.querySelectorAll('.page-content__p');
        const link = activeSlide.querySelectorAll('.page-content__btn');
        new SplitTextJS(title);
        const allText = activeSlide.querySelectorAll('.SplitTextJS-char')


        gsap.from(date, {
          opacity: 0,
          x: 20,
          duration: 0.8,
          delay: 1.2,
          ease: "back"
        });
        
        gsap.from([paragraphes, link], {
          opacity: 0,
          x: 20,
          duration: 0.8,
          delay: 1.8,
          ease: "back",
          stagger: 0.6
        });

        allText.forEach(el => {
          gsap.from(el, {
            opacity: 0,
            y: -50 * Math.random(),
            duration: 1.5,
            ease: "back"
          });
        });
      }
    }
  }

  init() {
    barba.init({
      transitions: [
        this.defaultPage(),
        this.toPage()
      ]
    },
    )
  }

}
