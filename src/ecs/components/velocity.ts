import { Component } from '../base/component';

export class Velocity extends Component {
    constructor(public vx: number, public vy: number) {
        super();
    }
}