import * as THREE from "three";
import gsap from "gsap";

import Orbit from './orbit';
import vertex from "../shaders/vertex";
import fragment from "../shaders/fragment";

export default class Scene {
  constructor(imagesArray) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.W / this.H,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.plane;
    this.material;
    
    this.container = document.querySelector("#scene-container");
    this.container.appendChild(this.renderer.domElement);
    
    this.renderer.setSize(this.W, this.H);
    
    //this.controls = new Orbit(this.camera, this.renderer.domElement);
    this.clock = new THREE.Clock();
    
    this.indexCurrent = 0;
    
    /**
     * Image from DOM
     */
    
    this.loader = new THREE.TextureLoader();
    this.textureArray = [];
    
    this.loadImages(imagesArray).then((img) => {
      this.textureArray = img;
      this.$image = img[this.indexCurrent];
      this.init();
      this.material.uniforms.texture.value = this.$image;
    });
  }

  init() {
    this.addObjects();
    this.animate();
    this.onWindowResize();
    this.listeners();
  }

  setIndexCurrent(index) {
    this.indexCurrent = index;
    this.material.uniforms.texture.value = this.textureArray[index];
  }

  setMySwiper(swiper) {
    const that = this;
    const url = new URL(window.location.href);
    if(!url.pathname.includes('pages')) {
      swiper.slideTo(that.indexCurrent); 
      swiper.on(
        "slideChange", function() {
          that.indexCurrent = this.activeIndex;
          that.material.uniforms.texture.value = that.textureArray[this.activeIndex];
        }
      ); 
    }
  }

  loadImages(imagesArray) {
    return new Promise((resolve, reject) => {
      const textureArray = [];
      imagesArray.forEach((image) => {
        const obj = this.loader.load(image.src);
        obj.src = image.src;
        obj.naturalWidth = image.naturalWidth || 2048;
        obj.naturalHeight = image.naturalHeight || 1024;
        textureArray.push(obj);
      });
      resolve(textureArray);
    });
  }

  addObjects() {
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        PR: { value: window.devicePixelRatio },
        time: { value: 1.0 },
        progress: { value: 0.0 },
        resolution: { value: new THREE.Vector4() },
        texture: { value: new THREE.DataTexture() },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      transparent: true
    });
    this.plane = new THREE.Mesh(geometry, this.material);

    this.scene.add(this.plane);
  }

  updateObjects() {
    const screenRatio = this.W/this.H;
    this.plane.scale.x = screenRatio;

    const imageAspect = this.$image.naturalWidth / this.$image.naturalHeight;
    let a1, a2;
    if(screenRatio > imageAspect) {
      a1 = (screenRatio / imageAspect) / screenRatio * 2;
      a2 = 1 / screenRatio * 2;
    } else {
      a1 = screenRatio / imageAspect;
      a2 = 1;
    }

    this.material.uniforms.resolution.value.x = this.W;
    this.material.uniforms.resolution.value.y = this.H;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.material.uniforms.time.value = this.clock.getElapsedTime();
  }

  listeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    window.addEventListener("mousedown", this.onMouseDown.bind(this), false);
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
    
    /* MOBILE */
    window.addEventListener("touchstart", this.onMouseDown.bind(this), false);
    window.addEventListener("touchend", this.onMouseUp.bind(this), false);
  }
  
  onMouseDown(ev) {
    if(ev.type !== "touchstart") {
      if(ev.toElement.tagName === "A") return;

      if(ev.stopPropagation) ev.stopPropagation();
      if(ev.preventDefault) ev.preventDefault();
      ev.cancelBubble=true;
      ev.returnValue=false;
    }

    gsap.to(this.material.uniforms.progress, {
      duration: 0.4,
      value: 1
    });
        
    return false;
  }
  

  onMouseUp() {
    gsap.to(this.material.uniforms.progress, {
      duration: 0.4,
      value: 0
    });
  }

  onWindowResize() {
    this.W = window.innerWidth;
    this.H = window.innerHeight;

    this.camera.aspect = this.W / this.H;
    this.camera.fov = THREE.Math.radToDeg(2*Math.atan(0.5/this.camera.position.z));
    this.renderer.setSize(this.W ,this.H);

    this.camera.updateProjectionMatrix();

    this.updateObjects();
  }
}

