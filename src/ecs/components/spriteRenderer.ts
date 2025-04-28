import * as PIXI from 'pixi.js';
import { Component } from '../base/component';

export class SpriteRenderer extends Component {
    sprite: PIXI.Sprite;

    constructor(texture: PIXI.Texture | null, public options?: { anchor?: number, scale?: number }) {
        super();
        if (texture != null) {
            this.sprite = new PIXI.Sprite(texture);
            if (options?.anchor !== undefined) {
                this.sprite.anchor.set(options.anchor);
            }
            if (options?.scale !== undefined) {
                this.sprite.scale.set(options.scale);
            }
        }
    }
}