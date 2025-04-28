import { Component } from '../base/component';

export class Health extends Component {
    constructor(public current: number = 100, public max: number = 100) {
        super();
    }
}