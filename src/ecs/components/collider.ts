import { Component } from "../base/component";

export class Collider extends Component{
    constructor(
        public width: number,
        public height: number,
        public offsetX: number = 0,
        public offsetY: number = 0,
        public isTrigger: boolean = false // true = no physical response, only events
    ) {
        super();
    }

    // Get the AABB (Axis-Aligned Bounding Box) based on position
    getAABB(x: number, y: number) {
        return {
            x: x + this.offsetX,
            y: y + this.offsetY,
            width: this.width,
            height: this.height,
        };
    }
}