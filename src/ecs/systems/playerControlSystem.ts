// systems/playerControlSystem.ts
import { System } from "../base/system";
import { World } from "../base/world";
import { Velocity } from "../components/velocity";
import { PlayerControlled } from "../components/playerControlled";
import { Collider } from "../components/collider";
import { SpritesAnimationRenderer } from "../components/spritesAnimationRenderer";
import { Entity } from "../base/entity";
import { Gun } from "../components/gun";

const keys: Record<string, boolean> = {};

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

export class PlayerControlSystem extends System {
    constructor(private world: World) {
        super();
    }

    update(): void {
        for (const entity of this.world.entities) {
            const control = entity.getComponent(PlayerControlled);
            if (!control) 
                continue;

            const velocity = entity.getComponent(Velocity);
            const collider = entity.getComponent(Collider);

            if (!velocity) 
                continue;

            velocity.vx = 0;
            
            if (keys["ArrowLeft"]){
                 velocity.vx = -30;
                    this.flipDericion(entity,true);
            }
            if (keys["ArrowRight"]) {
                velocity.vx = 30;
                    this.flipDericion(entity,false);
            }
            
            // velocity.vy = 0;
            if (collider && collider.isOnCollide && keys["ArrowUp"])
                 velocity.vy = -100;
        }
    }

    flipDericion(entity:Entity,left:boolean){
        const spriteAnimation = entity.getComponent(SpritesAnimationRenderer);
        const gun = entity.getComponent(Gun);
        if (spriteAnimation) {
            const sprite = spriteAnimation.sprite;
            if(left){
                if(gun)
                    gun.offsetX = - Math.abs(gun.offsetX);
                sprite.scale.x = Math.abs(spriteAnimation.sprite.scale.x) * -1;
                sprite.position.x = 30;
            }else{
                if(gun)
                    gun.offsetX =  Math.abs(gun.offsetX);
                sprite.scale.x = Math.abs(spriteAnimation.sprite.scale.x) * 1;
                sprite.position.x = 0;
            }
        }
    }
}
