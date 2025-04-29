import { Container, Graphics, Sprite } from 'pixi.js';
import { System } from '../base/system';
import { Health } from '../components/health';
import { World } from '../base/world';
import { Bullet } from '../components/bullet';
import { Position } from '../components/position';
import { SpriteRenderer } from '../components/spriteRenderer';
import { SpritesAnimationRenderer } from '../components/spritesAnimationRenderer';
import { Collider } from '../components/collider';
import { Gun } from '../components/gun';
import { Trigger } from '../components/trigger';
import { Velocity } from '../components/velocity';

export class RenderSystem extends System {

    private sprites: Map<number, Container> = new Map();

    constructor(private world: World, private stage: Container) {
        super();
    }

    update(delta: number): void {
        for (const entity of this.world.entities) {
            let container = this.sprites.get(entity.id);

            if (!container) {
                // Create container for sprite + HP bar
                container = new Container();

                const spriteRender = entity.getComponent(SpriteRenderer);
                
                if(spriteRender){
                    container.addChild(spriteRender.sprite);
                    spriteRender.sprite.position.set(spriteRender.offsetX,spriteRender.offsetY);
                    container['sprite'] = spriteRender.sprite; // Custom property
                }
                else
                {
                    const spriteRenderanimation = entity.getComponent(SpritesAnimationRenderer);
                    if(spriteRenderanimation){
                        spriteRenderanimation.sprite.position.set(spriteRenderanimation.offsetX,spriteRenderanimation.offsetY);
                        container.addChild(spriteRenderanimation.sprite);
                        container['sprite'] = spriteRenderanimation.sprite; // Custom property
                    }
                }

                // Add HP bar only if entity has health
                if (entity.getComponent(Health)) {
                    const hpBar = new Graphics();
                    hpBar.y = -15; // Position above the bot
                    container.addChild(hpBar);
                    container['hpBar'] = hpBar; // Custom property
                }

                const colliderDebug = entity.getComponent(Collider);
                if (colliderDebug) {
                    const pos = entity.getComponent(Position);
                    if(pos){                        
                        const outline = new Graphics();
                        outline.rect(colliderDebug.offsetX, colliderDebug.offsetY, colliderDebug.width, colliderDebug.height);
                        outline.stroke({
                            color : 0xff0000,
                            width : 1
                        });
                        container.addChild(outline);
                    }
                }

                const triggerDebug = entity.getComponent(Trigger);
                if (triggerDebug) {
                    const pos = entity.getComponent(Position);
                    if(pos){                        
                        const outline = new Graphics();
                        outline.rect(triggerDebug.offsetX, triggerDebug.offsetY, triggerDebug.width, triggerDebug.height);
                        outline.stroke({
                            color : 0x00ff00,
                            width : 1
                        });
                        container.addChild(outline);
                    }
                }

                const gunDebug = entity.getComponent(Gun);
                if (gunDebug) {
                    const pos = entity.getComponent(Position);
                    if(pos){                        
                        const outline = new Graphics();
                        outline.rect(gunDebug.offsetX, gunDebug.offsetY, 10, 10);
                        outline.stroke({
                            color : 0x0000ff,
                            width : 1
                        });
                        container.addChild(outline);
                    }
                }

                this.stage.addChild(container);
                this.sprites.set(entity.id, container);
            }

            // Update position
            const pos = entity.getComponent(Position);
            if (pos) {
                container.x = pos.x;
                container.y = pos.y;
            }

            // Update HP bar if exists
            const health = entity.getComponent(Health);
            if (health && container['hpBar']) {
                const hpBar = container['hpBar'] as Graphics;
                hpBar.clear();
                hpBar.rect(-1, -1, 32, 6); // Background (red)
                hpBar.fill(0xff0000);
                const healthWidth = (health.current / health.max) * 30;
                hpBar.rect(0, 0, healthWidth, 4); // Current health (green)
                hpBar.fill(0x00ff00);
            }
        }

        // Clean up dead entities
        for (const [id, container] of this.sprites.entries()) {
            if (!this.world.entities.some(e => e.id === id)) {
                this.stage.removeChild(container);
                this.sprites.delete(id);
            }
        }
    }
}
