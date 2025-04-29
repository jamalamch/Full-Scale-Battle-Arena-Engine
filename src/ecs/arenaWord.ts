import { World } from "./base/world";
import { MovementSystem } from './systems/movementSystem';
import { FiringSystem } from './systems/firingSystem';
import { RenderSystem } from './systems/renderSystem';
import { createDummyEntity } from './entities/dummyEntity';
import { BulletSystem } from "./systems/bulletSystem";
import { Container, Graphics } from "pixi.js";
import MainGame from "../mainGame";
import Map from "./map";
import { createPlayerEntity } from "./entities/playerEntity";
import { Entity } from "./base/entity";
import { Collider } from "./components/collider";
import { Position } from "./components/position";
import { CollisionSystem } from "./systems/collisionSystem";
import { createEnemyEntity } from "./entities/enemyEntity";

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
        
        const mapData = await this.map.init();
        this.bound = this.map.getBound();
        const mapScale = 100 * this.map.scale.x;
        mapData.colliders.forEach(colliderData => {
            const entity = new Entity();
        
            entity.addComponent(new Position(colliderData.x*mapScale, -colliderData.y*mapScale));
            entity.addComponent(new Collider(
                colliderData.z* mapScale,
                colliderData.w* mapScale,
                -colliderData.z* mapScale/2,
                -colliderData.w* mapScale/2,
                false
            ));
        
            // Optional: add a debug sprite or invisible sprite renderer
            // entity.addComponent(new SpriteRenderer(wallTexture));
        
            this.addEntity(entity);
        })

        this.addSystem(new MovementSystem(this));
        this.addSystem(new RenderSystem(this, this.mainContainer));
        this.addSystem(new BulletSystem(this));
        this.addSystem(new FiringSystem(this));
        this.addSystem(new CollisionSystem(this));

        // Create some dummy entities
        for (let i = 0; i < 10; i++) {
            this.addEntity(createEnemyEntity(Math.floor(Math.random() * 3) + 1));
        }
        this.addEntity(createPlayerEntity());
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