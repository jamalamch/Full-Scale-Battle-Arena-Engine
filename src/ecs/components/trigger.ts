import { Collider } from "./collider";

export class Trigger extends Collider{
    override isTrigger: boolean = true;
    constructor(
        width: number,
        height: number,
        offsetX: number = 0,
        offsetY: number = 0,
    ) {
        super(width,height,offsetX,offsetY);
    }
}