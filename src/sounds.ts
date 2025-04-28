import { Howl } from 'howler';

export default class Sounds {
    static soundBG;
    static soundWin;
    static soundStar;
    static soundWrong;
    static soundTap;
    static soundButton;

    static soundMerge:any[] = [];
    static indexSoundMerge:number = 0;

    static bgMusciIsPlay:boolean;
    static isInit: boolean;

    static init() {
        Sounds.soundBG = new Howl({
            src: ['music/mainBg.wav'],
            loop: true,
            volume: 0.2
        });
        Sounds.soundWin = new Howl({
            src: ['music/comp3.wav'],
            loop: false
        });
        Sounds.soundWrong = new Howl({
            src: ['music/wrong.wav'],
            loop: false,
            volume: 1
        });
        Sounds.soundButton = new Howl({
            src: ['music/button.wav'],
            loop: false
        });
        Sounds.soundTap = new Howl({
            src: ['music/Tap.wav'],
            loop: false
        });
        Sounds.soundStar = new Howl({
            src: ['music/Star.wav'],
            loop: false
        });
        for (let index = 1; index < 12; index++) {
            Sounds.soundMerge.push(new Howl({
                src: [`./music/merge/merge_${index}.wav`],
                loop: false,
                volume: 1
            }));
        }

        this.isInit = true;
    }

    static playBgMusic (): void{
        if(!Sounds.bgMusciIsPlay && this.isInit){
            Sounds.bgMusciIsPlay = true;
            Sounds.soundBG.play();
        }
    }
    static stopBgMusic(): void{
        if(Sounds.bgMusciIsPlay && this.isInit){
            Sounds.bgMusciIsPlay = false;
            Sounds.soundBG.stop();
        }
    }

    static playMergeSound(): void{
        if(this.isInit){
            Sounds.soundMerge[Sounds.indexSoundMerge].play();
            Sounds.indexSoundMerge++;
            if(Sounds.indexSoundMerge>10)
                Sounds.indexSoundMerge = 0;
        }
    }
}