import { System } from '../base/system';
import { World } from '../base/world';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Collider } from '../components/collider';
import { Health } from '../components/health';
import { Bullet } from '../components/bullet';
import { Trigger } from '../components/trigger';

export class CollisionSystem extends System {
    constructor(private world: World) {
        super();
    }

    update(delta: number): void {
        // Get all entities that have Collider and Velocity
        const colliders = this.world.entities.filter(
            e => e.getComponent(Collider)
        );

        const movingEntities = colliders.filter(
            e => e.getComponent(Velocity)
        );

        for (let i = 0; i < movingEntities.length; i++) {
            const entityA = movingEntities[i];
            
            const posA = entityA.getComponent(Position);
            const velA = entityA.getComponent(Velocity);
            const colliderA = entityA.getComponent(Collider);
            if (!posA || !velA || !colliderA) continue;
            colliderA.isOnCollide = false;
            const boxA = colliderA.getAABB(posA.x, posA.y);

            // Check for collision with every other moving entity
            for (let j = 0; j < colliders.length; j++) {
                const entityB = colliders[j];
                if (entityB != entityA) {
                    const posB = entityB.getComponent(Position);
                    const colliderB = entityB.getComponent(Collider);

                    if (!posB || !colliderB) continue;

                    const boxB = colliderB.getAABB(posB.x, posB.y);

                    // Check if the two boxes intersect
                    if (this.boxIntersect(boxA, boxB)) {
                        colliderA.isOnCollide = true;
                        this.handleCollision(entityA, entityB, posA, posB, colliderA, colliderB);
                    }
                }
            }
        }

        const triggers = this.world.entities.filter(
            e => e.getComponent(Trigger)
        );

        const bullets = triggers.filter(
            e => e.getComponent(Bullet)
        );

        for (let i = 0; i < bullets.length; i++) {
            const bulletEntity = bullets[i];
            const bullet1Trigger = bulletEntity.getComponent(Trigger);
            const bulletPosA = bulletEntity.getComponent(Position);
            if(bullet1Trigger && bulletPosA){
                const boxA = bullet1Trigger.getAABB(bulletPosA.x, bulletPosA.y);
                for (let j = 0; j < triggers.length; j++) {
                    const entityB = triggers[j];
                    const colliderB = entityB.getComponent(Trigger);
                    const posB = entityB.getComponent(Position);
                    if (!posB || !colliderB) continue;
                    
                    const boxB = colliderB.getAABB(posB.x, posB.y);
                    // Check if the two boxes intersect
                    if (this.boxIntersect(boxA, boxB)) {
                        const healthB = entityB.getComponent(Health);
                        if(healthB){
                            healthB.current -= 5; // Deal 5 damage to A
                            this.world.entities = this.world.entities.filter(e => e !== bulletEntity);
                            console.log(`Bullet Explode!`);
                            if (healthB.current <= 0) {
                                this.world.entities = this.world.entities.filter(e => e !== entityB);
                                console.log(`Entity B died!`);
                            }
                        }
                    }
                }
            }
        }
    }

    // Collision detection: AABB intersection
    private boxIntersect(a: { x: number, y: number, width: number, height: number },
                         b: { x: number, y: number, width: number, height: number }): boolean {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    // Handle collision and adjust positions
    private handleCollision(entityA: any, entityB: any, posA: Position, posB: Position,
        colliderA: Collider, colliderB: Collider): void {

        if (!colliderA.isTrigger && !colliderB.isTrigger) {
            // Calculate overlap width and height
            const boxA = colliderA.getAABB(posA.x, posA.y);
            const boxB = colliderB.getAABB(posB.x, posB.y);

            const overlapX = Math.min(boxA.x + boxA.width - boxB.x, boxB.x + boxB.width - boxA.x);
            const overlapY = Math.min(boxA.y + boxA.height - boxB.y, boxB.y + boxB.height - boxA.y);

            // If there is overlap in the X axis, adjust the positions
            if (overlapX < overlapY) {
                // Push entityA out of entityB in the X direction
                if (boxA.x < boxB.x) {
                    posA.x = boxB.x - boxA.width - colliderA.offsetX; // Move left
                } else {
                    posA.x = boxB.x + boxB.width - colliderA.offsetX; // Move right
                }
            } else {
                // Push entityA out of entityB in the Y direction
                if (boxA.y < boxB.y) {
                    posA.y = boxB.y - boxA.height - colliderA.offsetY; // Move up
                } else {
                    posA.y = boxB.y + boxB.height - colliderA.offsetY; // Move down
                }
            }
        }

        const healthA = entityA.getComponent(Health);
        const healthB = entityB.getComponent(Health);

        if (healthA && healthB) {
            // Example: deal damage to each other on collision (or trigger other effects)
            healthA.current -= 5; // Deal 5 damage to A
            healthB.current -= 5; // Deal 5 damage to B

            // Check for death and remove entity if needed
            if (healthA.current <= 0) {
                this.world.entities = this.world.entities.filter(e => e !== entityA);
                console.log(`Entity A died!`);
            }

            if (healthB.current <= 0) {
                this.world.entities = this.world.entities.filter(e => e !== entityB);
                console.log(`Entity B died!`);
            }
        }
    }
}
