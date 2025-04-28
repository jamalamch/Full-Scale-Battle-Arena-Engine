import { Entity } from './base/entity';
import { System } from './base/system';

export class World {
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
