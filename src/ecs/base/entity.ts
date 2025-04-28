import { Component } from './component';

let idCounter = 0;

export class Entity {
    id: number;
    components: Map<string, Component> = new Map();

    constructor() {
        this.id = idCounter++;
    }

    addComponent(component: Component) {
        this.components.set(component.constructor.name, component);
    }

    getComponent<T extends Component>(type: new (...args: any[]) => T): T | undefined {
        return this.components.get(type.name) as T;
    }
}