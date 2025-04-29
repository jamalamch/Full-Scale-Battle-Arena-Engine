import { Component } from '../base/component';

export class Gun extends Component {
    constructor(public offsetX: number = 0,public offsetY: number = 0) {
        super();
    }
}