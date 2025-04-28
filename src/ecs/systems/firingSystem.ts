import { System } from '../base/system';
import { World } from '../base/world';
import { Position } from '../components/position';
import { BulletEntity } from '../entities/bulletEntity';

export class FiringSystem extends System {
    fireCooldown = 0;

    constructor(private world: World) {
        super();
    }

    update(delta: number): void {
        this.fireCooldown -= delta;

        if (this.fireCooldown <= 0) {
            // Pick random entity to fire
            const shooters = this.world.entities.filter(e => e.getComponent(Position));
            if (shooters.length > 0) {
                const shooter = shooters[Math.floor(Math.random() * shooters.length)];
                const pos = shooter.getComponent(Position);

                if (pos) {
                    // Random velocity (spread shot for now)
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 300;
                    
                    this.world.addEntity(BulletEntity(pos.x, pos.y, Math.cos(angle) * speed, Math.sin(angle) * speed));
                }
            }

            // Reset fire cooldown
            this.fireCooldown = 0.3; // Fire every 0.3 seconds
        }
    }
}
