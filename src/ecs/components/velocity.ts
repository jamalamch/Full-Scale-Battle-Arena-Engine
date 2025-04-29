import { Component } from '../base/component';

export class Velocity extends Component {
    constructor(public vx: number = 2, public vy: number = 2, public bounce:boolean = false, public gravity:boolean = false) {
        super();
    }
}