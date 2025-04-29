import { System } from '../base/system';
import { World } from '../base/world';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';

export class MovementSystem extends System {

    readonly gravity:number = 1;

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

                // Optional gravity
                if (vel.gravity) {
                    vel.vy += this.gravity * delta * 60;
                }

                if(vel.bounce){
                    const bound = this.world.bound;
                    if (pos.y < bound.minY) {
                        pos.y = bound.minY;
                        vel.vy = Math.abs(vel.vy);
                    }
                    // Bounce off bottom
                    if (pos.y > bound.maxY) {
                        pos.y = bound.maxY;
                        vel.vy = -1 * Math.abs(vel.vx);
                    }
                
                    // Bounce off sides
                    if (pos.x < bound.minX) {
                        pos.x = bound.minX;
                        vel.vx = Math.abs(vel.vx);
                    }

                    // Bounce off sides
                    if (pos.x > bound.maxX) {
                        pos.x = bound.maxX;
                        vel.vx = -1 * Math.abs(vel.vx);
                    }
                }
            }
        }
    }
}
