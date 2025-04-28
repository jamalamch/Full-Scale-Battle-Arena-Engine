import { World } from "./base/world";
import { MovementSystem } from './systems/movementSystem';
import { FiringSystem } from './systems/firingSystem';
import { RenderSystem } from './systems/renderSystem';
import { createDummyEntity } from './entities/dummyEntity';
import { BulletSystem } from "./systems/bulletSystem";
import { Container, Graphics } from "pixi.js";
import MainGame from "../mainGame";
import Map from "./map";

export default class ArenaWord extends World {

    mainContainer:Container;
    mainGame:MainGame;
    map:Map;

    readonly timeToEndMatch:number = 60*20.1;//20min match
    
    currentTimer:number = 0;
    tmpSteepTimer:number = 0;

    mapIndex:number = 1;

    constructor(mainGame:MainGame){
        super();
        this.mainGame = mainGame;
        // Add Systems
        this.mainContainer = new Container();
        this.map = new Map(this.mainContainer, this.mapIndex);
    }

    async init(){
        await this.map.init();
        this.bound = this.map.getBound();

        this.addSystem(new MovementSystem(this));
        this.addSystem(new RenderSystem(this, this.mainContainer));
        this.addSystem(new BulletSystem(this));
        this.addSystem(new FiringSystem(this));

        // Create some dummy entities
        for (let i = 0; i < 10; i++) {
            this.addEntity(createDummyEntity());
        }

        this.currentTimer = this.timeToEndMatch;
        this.mainGame.onResizeHandlers.push(()=>{
            this.reposition();
        }); 
        this.reposition();
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

    reposition(){
        this.mainContainer.x = (this.mainGame.screenWidth) / 2;
        this.mainContainer.y = (this.mainGame.screenHeight) / 2;
    }
}