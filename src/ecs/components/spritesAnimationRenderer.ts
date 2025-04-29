import { AnimatedSprite, Assets } from 'pixi.js';
import { SpriteRenderer } from './spriteRenderer';

export class SpritesAnimationRenderer extends SpriteRenderer {

    spriteAnimation: PIXI.AnimatedSprite;

    constructor(textures: PIXI.Texture[], public options?: { anchor?: number , scale?: number}) {
        super(null,options);
        // Animated Sprite
        this.spriteAnimation = new AnimatedSprite(textures);
        this.spriteAnimation.animationSpeed = 0.5; // default
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