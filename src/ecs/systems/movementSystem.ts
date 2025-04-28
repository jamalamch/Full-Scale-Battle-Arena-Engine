import { System } from '../base/system';
import { World } from '../world';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';

export class MovementSystem extends System {
    constructor(private world: World) {
        super();
    }

    update(delta: number): void {
        for (const entity of this.world.entities) {
            const pos = entity.getComponent(Position);
            const vel = entity.getComponent(Velocity);

            if (pos && vel) {
                pos.x += vel.vx * delta * 60;
                pos.y += vel.vy * delta * 60;
            }
        }
    }
}
