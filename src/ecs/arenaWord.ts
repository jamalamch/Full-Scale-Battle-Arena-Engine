import { World } from "./base/world";
import { MovementSystem } from './systems/movementSystem';
import { FiringSystem } from './systems/firingSystem';
import { RenderSystem } from './systems/renderSystem';
import { createDummyEntity } from './entities/dummyEntity';
import { BulletSystem } from "./systems/bulletSystem";
import { Container } from "pixi.js";
import MainGame from "../mainGame";

export default class ArenaWord extends World {

    mainContainer:Container;
    mainGame:MainGame;

    timeToEndLevel:number = 60*20.1;//
    currentTimer:number;
    tmpSteepTimer:number;

    constructor(mainGame:MainGame){
        super(1000,1000);
        this.mainGame = mainGame;
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

    override update(delta: number): void {
        super.update(delta);
        this.updateTimer(delta);
    }

    updateTimer(delta: number){
        this.tmpSteepTimer += delta;
        if (this.tmpSteepTimer > 1) {
            this.currentTimer -= this.tmpSteepTimer;
            this.tmpSteepTimer = 0;
            // Prevent negative timer
            if (this.currentTimer < 0) {
                this.currentTimer = 0;
                this.mainGame.gameLose();
            }
            // Format timer as MM:SS
            const minutes = Math.floor(this.currentTimer / 60);
            const seconds = Math.floor(this.currentTimer % 60);
            // Update text
            this.mainGame.uiGame.timerText.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}