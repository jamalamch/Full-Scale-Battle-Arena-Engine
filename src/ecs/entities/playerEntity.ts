import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { Assets, Spritesheet, Texture } from 'pixi.js';
import { Gun } from '../components/gun';
import { SpritesAnimationRenderer } from '../components/spritesAnimationRenderer';

export function createPlayerEntity(): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(Math.random() * 80, Math.random() * 60));
    entity.addComponent(new Velocity((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, false , true));
    entity.addComponent(new Health(100, 100)); // 100 HP

    const animatedSprite:Spritesheet = Assets.get<Spritesheet>("./images/policeAndTerrorist.json");

    entity.addComponent(new SpritesAnimationRenderer(animatedSprite.animations["police/3/idle/3_police_Idle"], {scale : 0.1}));
    entity.addComponent(new Gun(0.5,-0.75));
    return entity;
}