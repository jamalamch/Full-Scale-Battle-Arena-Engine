import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';
import { Lifetime } from '../components/lifetime';

export function BulletEntity(xp:number,yp:number,xv:number,yv:number): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(xp, yp));
    entity.addComponent(new Velocity(xv, yv));
    entity.addComponent(new Lifetime(2));
    return entity;
}