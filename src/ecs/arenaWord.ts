import { World } from "./base/world";
import { MovementSystem } from './systems/movementSystem';
import { FiringSystem } from './systems/firingSystem';
import { RenderSystem } from './systems/renderSystem';
import { createDummyEntity } from './entities/dummyEntity';
import { BulletSystem } from "./systems/bulletSystem";
import { Container } from "pixi.js";

export default class ArenaWord extends World {

    mainContainer:Container;

    constructor(){
        super(1000,1000);
        // Add Systems

        this.mainContainer = new Container();

        this.addSystem(new MovementSystem(this));
        this.addSystem(new RenderSystem(this, this.mainContainer));
        this.addSystem(new BulletSystem(this));
        this.addSystem(new FiringSystem(this));

        // Create some dummy entities
        for (let i = 0; i < 10; i++) {
            this.addEntity(createDummyEntity());
        }
    }
}