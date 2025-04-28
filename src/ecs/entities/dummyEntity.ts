import { Entity } from '../base/entity';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
import { Health } from '../components/health';

export function createDummyEntity(): Entity {
    const entity = new Entity();
    entity.addComponent(new Position(Math.random() * 800, Math.random() * 600));
    entity.addComponent(new Velocity((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
    entity.addComponent(new Health(100, 100)); // 100 HP
    return entity;
}