import { Component } from '../base/component';

export class Gun extends Component {
    constructor(public offsetx: number = 0,public offsety: number = 0) {
        super();
    }
}