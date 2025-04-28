import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { SpriteRenderer } from '../components/spriteRenderer';
import { Texture } from 'pixi.js';
import { Gun } from '../components/gun';

export function createDummyEntity(): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(Math.random() * 800, Math.random() * 600));
    entity.addComponent(new Velocity((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));
    entity.addComponent(new Health(100, 100)); // 100 HP
    entity.addComponent(new SpriteRenderer(Texture.from("cell_paint.png"), {scale : 0.5}));
    entity.addComponent(new Gun(0.5,-0.75));
    return entity;
}