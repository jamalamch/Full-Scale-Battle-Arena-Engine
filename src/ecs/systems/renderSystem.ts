import { Container, Graphics } from 'pixi.js';
import { System } from '../base/system';
import { Health } from '../components/health';
import { World } from '../base/world';
import { Bullet } from '../components/bullet';
import { Position } from '../components/position';
import { SpriteRenderer } from '../components/spriteRenderer';
import { SpritesAnimationRenderer } from '../components/spritesAnimationRenderer';

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
                    container['sprite'] = spriteRender.sprite; // Custom property
                }
                else
                {
                    const spriteRenderanimation = entity.getComponent(SpritesAnimationRenderer);
                    if(spriteRenderanimation){
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
                hpBar.rect(-15, 0, 30, 4); // Background (red)
                hpBar.fill(0xff0000);
                const healthWidth = (health.current / health.max) * 30;
                hpBar.rect(-15, 0, healthWidth, 4); // Current health (green)
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
