import * as dat from "dat.gui";

export default class Gui {

    init() {
        this.settings = {
        progress: 0.5
        };
        this.gui = new dat.GUI();
        this.gui.addFolder("Settings");
        this.gui.add(this.settings, "progress", 0, 5).step(0.01);
    }
}