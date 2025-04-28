import { Component } from '../base/component';

export class Lifetime extends Component {
    constructor(public remaining: number = 50) {
        super();
    }
}
