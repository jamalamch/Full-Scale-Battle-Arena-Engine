import { System } from '../base/system';
import { World } from '../world';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Lifetime } from '../components/lifetime';

export class BulletSystem extends System {
    constructor(private world: World) {
        super();
    }

    update(delta: number): void {
        for (const entity of this.world.entities) {
            const lifetime = entity.getComponent(Lifetime);

            if (lifetime) {
                lifetime.remaining -= delta;
                if (lifetime.remaining <= 0) {
                    // Remove bullet entity
                    this.world.entities = this.world.entities.filter(e => e !== entity);
                }
            }
        }
    }
}
