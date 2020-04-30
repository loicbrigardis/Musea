import OrbitControls from "orbit-controls-es6";

export default class Orbit {
    constructor(camera, renderer) {
        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;
    }
}