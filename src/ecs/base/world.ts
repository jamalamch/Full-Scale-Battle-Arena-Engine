import { Entity } from './entity';
import { System } from './system';

export interface Bound {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class World {
    bound: Bound;
    
    constructor() {
    }

    entities: Entity[] = [];
    systems: System[] = [];

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    addSystem(system: System) {
        this.systems.push(system);
    }

    update(delta: number) {
        for (const system of this.systems) {
            system.update(delta);
        }
    }
}
