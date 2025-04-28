import { Entity } from './entity';
import { System } from './system';

export class World {
    
    constructor(public width: number,public height: number) {
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
