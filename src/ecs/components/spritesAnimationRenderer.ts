import { AnimatedSprite, Assets, Texture } from 'pixi.js';
import { SpriteRenderer ,SpriteRendererOptions } from './spriteRenderer';

export class SpritesAnimationRenderer extends SpriteRenderer {

    spriteAnimation: AnimatedSprite;

    constructor(textures: Texture[], public options?: SpriteRendererOptions) {
        super(null,options);
        // Animated Sprite
        this.spriteAnimation = new AnimatedSprite(textures);
        this.spriteAnimation.animationSpeed = 0.2; // default
        this.spriteAnimation.play();
        this.sprite = this.spriteAnimation;
        
        if (options?.anchor !== undefined) {
            this.spriteAnimation.anchor.set(options.anchor);
        }
        if (options?.scale !== undefined) {
            this.spriteAnimation.scale.set(options.scale);
        }
    }
}