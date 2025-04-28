import { System } from '../base/system';
import { World } from '../base/world';
import { Position } from '../components/position';
import { Bullet } from '../components/bullet';
import { Health } from '../components/health';

export class CollisionSystem extends System {
    constructor(private world: World) {
        super();
    }

    update(delta: number): void {
        const bullets = this.world.entities.filter(e => e.getComponent(Bullet));
        const targets = this.world.entities.filter(e => e.getComponent(Health));

        for (const bullet of bullets) {
            const bulletPos = bullet.getComponent(Position);
            if (!bulletPos) continue;

            for (const target of targets) {
                const targetPos = target.getComponent(Position);
                const health = target.getComponent(Health);
                if (!targetPos || !health) continue;

                const dx = bulletPos.x - targetPos.x;
                const dy = bulletPos.y - targetPos.y;
                const distSq = dx * dx + dy * dy;
                const radius = 10; // Hit radius (same as bot size)

                if (distSq < radius * radius) {
                    // Hit detected!
                    health.current -= 10; // Deal 10 damage

                    // Remove bullet
                    this.world.entities = this.world.entities.filter(e => e !== bullet);

                    // Check if target dies
                    if (health.current <= 0) {
                        this.world.entities = this.world.entities.filter(e => e !== target);
                        console.log(`Entity ${target.id} died!`);
                    }

                    break; // Bullet destroyed, stop checking
                }
            }
        }
    }
}
