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

                if (pos.y < 0) {
                    pos.y = 0;
                    vel.vy = Math.abs(vel.vy);
                }
                // Bounce off bottom
                if (pos.y > this.world.height) {
                    pos.y = this.world.height;
                    vel.vy = -1 * Math.abs(vel.vx);
                }
    
                // Bounce off sides
                if (pos.x < 0) {
                    pos.x = 0;
                    vel.vx = Math.abs(vel.vx);
                }

                // Bounce off sides
                if (pos.x > this.world.width) {
                    pos.x = this.world.width;
                    vel.vx = -1 * Math.abs(vel.vx);
                }
            }
        }
    }
}
