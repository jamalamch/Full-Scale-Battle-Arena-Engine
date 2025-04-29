import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { Assets, Spritesheet, Texture } from 'pixi.js';
import { Gun } from '../components/gun';
import { SpritesAnimationRenderer } from '../components/spritesAnimationRenderer';
import { Collider } from '../components/collider';

export function createEnemyEntity(index:number = 1): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(Math.random() * 800 - 400, -Math.random() * 360));
    entity.addComponent(new Velocity(0, 0, false , true));
    entity.addComponent(new Health(100, 100)); // 100 HP

    const animatedSprite:Spritesheet = Assets.get<Spritesheet>("./images/policeAndTerrorist.json");

    entity.addComponent(new SpritesAnimationRenderer(animatedSprite.animations[`terrorist/${index}/idle/${index}_terrorist_${index}_Idle`], {scale : 0.1}));
    entity.addComponent(new Gun(0.5,-0.75));
    entity.addComponent(new Collider(30, 120, 0, 0)); // trigger-type collider
    return entity;
}