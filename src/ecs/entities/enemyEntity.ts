import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { Assets, Spritesheet, Texture } from 'pixi.js';
import { Gun } from '../components/gun';
import { SpritesAnimationRenderer } from '../components/spritesAnimationRenderer';
import { Collider } from '../components/collider';
import { Trigger } from '../components/trigger';

export function createEnemyEntity(index:number = 1): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(Math.random() * 800 - 400, -Math.random() * 360));
    entity.addComponent(new Velocity(0, 0, false , true));
    entity.addComponent(new Health(100, 100)); // 100 HP

    const animatedSprite:Spritesheet = Assets.get<Spritesheet>("./images/policeAndTerrorist.json");

    entity.addComponent(new SpritesAnimationRenderer(animatedSprite.animations[`terrorist/${index}/idle/${index}_terrorist_${index}_Idle`], {scale : 0.1}));
    entity.addComponent(new Gun(40,70));
    entity.addComponent(new Trigger(34, 124, -2, -2)); // trigger-type collider
    entity.addComponent(new Collider(30, 20, 0, 100)); // type collider
    return entity;
}