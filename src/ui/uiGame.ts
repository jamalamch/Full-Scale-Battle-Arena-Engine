import { Container, FillGradient, Graphics, Sprite ,Text, Texture} from "pixi.js";
import MainGame from "../mainGame";
import MyStyleText from "./myStyleText";
import { Button } from "./button";
import gsap from "gsap";
import { Panel } from "./panel";

export default class UiGame {
    containerWin: Container;
    containerTopRight: Container;
    containerTop: Container;
    containerButton: Container;

    baseScale: number;

    timerText:Text;
    
    coinTextSpriteBg:Graphics;
    coinTextSpriteIcon:Sprite;
    coinText:Text;

    textureHealthOn: Texture;
    textureHealthOff: Texture;

    resultText: Text;
    btnNextLevel: Button;
    spriteYouWin: Sprite;

    losePanel:Panel;

    constructor(){
        const mainGame: MainGame = MainGame.instance;

        this.baseScale = mainGame.getScale();
    
        this.containerWin = new Container();
        this.containerWin.interactiveChildren = false;

        this.containerTop = new Container();
        this.containerTop.interactiveChildren = false;

        this.containerButton = new Container();

        this.containerTopRight = new Container();
        this.containerTop.interactiveChildren = false;


        mainGame.onResizeHandlers.push(() => {
            this.baseScale = mainGame.getScale();
            resize();
        });
        
        this.textureHealthOn = Texture.from("heart_on.png");
        this.textureHealthOff = Texture.from("heart_off.png");
        const bigHeart = Texture.from("heart_big.png");

        //this.losePanel = new Panel("You Lose", 0xDDDDDD, 0xe35251, "replay", 0xe35251, "revive", bigHeart);    
        this.losePanel = new Panel(900,1000, 0xDDDDDD);    
        this.losePanel.addTitle("OUT OF LIVES!", 0xe35251, 100);
        this.losePanel.addIconSprite(bigHeart);
        this.losePanel.addButton1("No Thanks",0x3ee412);
        this.losePanel.addButton2("Restore Lives",0xa3a8e9);
        this.losePanel.addMsg("watch ads to restore all heal");
        this.losePanel.zIndex = 11;

        mainGame.appPIXI.stage.addChild(this.containerTop, this.containerTopRight,this.containerButton,this.containerWin,this.losePanel);

        const gradianTop = new Graphics();
        gradianTop.rect(-50,-50,100,100);
        const linearGradient = new FillGradient({
             type: 'linear',
             start: { x: 0.5, y: 0 },  // Start at top
             end: { x: 0.5, y: 1 },    // End at bottom
             colorStops: [
                 { offset: 0, color: '#5fb479FF' },
                 { offset: 0.6, color: '#5fb47988' },
                 { offset: 1, color: '#5fb47900' } 
             ],
             textureSpace: 'local'
        });
        gradianTop.fill(linearGradient);
        gradianTop.position.y = 50;
        this.containerTop.addChild(gradianTop);

        const resize = () => {
            this.containerWin.position.set(mainGame.screenCenterX, mainGame.screenCenterY);
            this.containerWin.scale.set(this.baseScale);

            this.losePanel.position.set(mainGame.screenCenterX, mainGame.screenCenterY);
            this.losePanel.scale.set(this.baseScale);
            
            this.containerTop.position.set(mainGame.screenCenterX, 0);
            this.containerTop.scale.set(this.baseScale);

            this.containerButton.position.set(mainGame.screenCenterX, mainGame.screenHeight );
            this.containerButton.scale.set(this.baseScale);

            this.containerTopRight.position.set(mainGame.screenWidth - this.baseScale * 100, this.baseScale * 50);
            this.containerTopRight.scale.set(this.baseScale);

            gradianTop.scale.x = mainGame.screenWidth/(100 * this.baseScale) ;
        }

        resize();

        this.timerText = MyStyleText.creatText("20:00",50);

        this.timerText.anchor.set(0.5);
        this.timerText.position.set(0,50);
        this.timerText.visible = true;

        this.containerTop.addChild(this.timerText);

        const widthCoinTextSpriteBg = 160;

        this.coinTextSpriteBg = new Graphics();
        this.coinTextSpriteBg.roundRect(-widthCoinTextSpriteBg/2, -20, widthCoinTextSpriteBg, 40, 14);
        this.coinTextSpriteBg.fill(0xc4927b);
        this.coinTextSpriteBg.stroke({
            color: 0x555555,
            width: 5,
            alignment: 0,
        });

        const coinTextSpriteIconTewture = Texture.from("coin.png");
        this.coinTextSpriteIcon = new Sprite(coinTextSpriteIconTewture);
        this.coinTextSpriteIcon.anchor.set(0,0.5);
        this.coinTextSpriteIcon.position.x = -widthCoinTextSpriteBg/2;
        this.coinTextSpriteIcon.setSize(40);
        this.coinText = MyStyleText.creatText(String(MainGame.instance.score),40);
        this.coinText.position.x = 15;
        this.containerTopRight.addChild(this.coinTextSpriteBg,this.coinTextSpriteIcon ,this.coinText);


        this.resultText = MyStyleText.creatText("",49,0x02799b);
        this.resultText.position.set(0, 394); 
        this.resultText.style.stroke = {
            color: 0x999999,
            width: 5,
            alignment: 0,
        };
        
        const textureYouWinTitle = Texture.from("youwin.png");

        this.btnNextLevel = new Button("NEXT LEVEL",0x14aad6,0x02799b,500,150,70);
        this.btnNextLevel.position.set(0,560);

        this.spriteYouWin = new Sprite(textureYouWinTitle);
        this.spriteYouWin.scale.set(2.8);
        this.spriteYouWin.anchor.set(0.5, 0.5);
        this.spriteYouWin.interactive = false;
        this.spriteYouWin.position.set(0,-200);
        
        this.containerWin.addChild(this.spriteYouWin,this.btnNextLevel,this.resultText);    

        this.containerWin.visible = false;
        this.containerWin.zIndex = 12;
        this.btnNextLevel.onClick(() => {
            MainGame.instance.resetLevelAds();
            this.closeWin();
        });
        this.losePanel.button1.onClick(()=> {
            MainGame.instance.resetLevelAds();
        });
        this.losePanel.button2.onClick(() => {
            MainGame.instance.revireLevelRewordAds();
        });
    }

    openLose(){
        this.losePanel.openPanel();
    }
    openWin()
    {
        if(!this.containerWin.interactiveChildren){
            this.containerWin.interactiveChildren = true;
            this.containerWin.visible = true;
            this.containerWin.alpha = 0;

            this.containerTopRight.alpha = 0;

            gsap.to(this.containerWin, {
                alpha: 1,
                ease: "sine.out",
                delay: 1.8,
                duration:0.5
            });

            gsap.to(this.containerTop, {
                alpha: 0,
                ease: "sine.in",
                delay: 0.15
            });
        }
    }
    closeWin()
    {
        if(this.containerWin.interactiveChildren){
            this.containerWin.interactiveChildren = false;

            gsap.to(this.containerWin, {
                alpha: 0,
                ease: "sine.in",
                delay: 0.25,
                onComplete : ()=>{
                    this.containerWin.visible = false;
                }
            });

            gsap.to(this.containerTop, {
                alpha: 1,
                ease: "sine.out",
                delay: 0.25
            });
        }
    }
}