import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { Lifetime } from '../components/lifetime';
import { SpriteRenderer } from '../components/spriteRenderer';
import { Texture } from 'pixi.js';
import { Collider } from '../components/collider';
import { Trigger } from '../components/trigger';

export function BulletEntity(xp:number,yp:number,xv:number,yv:number): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(xp, yp));
    entity.addComponent(new Velocity(xv, yv));
    entity.addComponent(new Lifetime(2));
    const renderSprite:SpriteRenderer = new SpriteRenderer(Texture.from("cell_paint.png"));
    renderSprite.sprite.anchor = 0.5;
    renderSprite.sprite.scale = 0.2;
    renderSprite.sprite.tint = 0x111111;
    entity.addComponent(renderSprite);
    entity.addComponent(new Trigger(8, 8, 0, 0)); // trigger-type collider
    return entity;
}