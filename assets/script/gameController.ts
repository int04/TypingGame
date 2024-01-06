import { _decorator, Component, Node, Layout, Label, instantiate, find, tween, view, color } from 'cc';
import {winController} from "db://assets/script/winController";
import {inputController} from "db://assets/script/inputController";
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    @property(winController)
    public win : winController = null;

    @property(inputController)
    public input : inputController = null;

    @property(Node)
    public tips : Node = null;

    private point : number = 0;
    private time : number = 0;
    private life : number = 0;

    @property(Layout)
    public layout : Layout = null;

    @property(Label)
    public pointLabel : Label = null;

    @property(Label)
    public timeLabel : Label = null;

    public textMax : number = 3;
    public text : number = 0;

    public speed : number = 5;


    public listText: Array<string> = [ "cai dit con me may thang suc vat nay chet con me may di" ];

    public RunText: Array<string> = [];

    getLengMax(): number {
        let max = 0;
        for(let i = 0; i < this.RunText.length; i++) {
            let text = this.RunText[i].length;
            if(max === null || max < text) {
                max = text;
            }
        }
        return max;
    }

    check(msg : string) : void {
        let list = find("string", this.node);
        if(list) {
            let children = list.children;
            for(let i = 0; i < children.length; i++) {
                let node = children[i];
                if(node.name === 'demo') continue;
                if(node.name === msg) {

                    // tween scale node
                    let scale = {x: 1, y: 1};
                    let to = {x: 1.5, y: 1.5};
                    tween(scale)
                        .to(0.1, to, {
                            onUpdate: () => {
                               // node.setScale(scale.x, scale.y,0);
                            }
                        })
                        .call(() => {
                            node.destroy();
                            this.point++;
                            this.text--;
                            this.renderTexture();
                            this.input.reset();
                        })
                        .start();


                }
            }
        }
    }

    checkText(str: string): void {
        let max = this.getLengMax();
        str = str.toLowerCase();

        for(let i = 0; i < str.length; i++) {
            let ghep: string = str[i];
            for(let j = i + 1; j < str.length; j++) {
                ghep += str[j];
                this.check(ghep);
            }
        }


        if(str.length >max+2) {
            console.log('Xóa do vượt')
            this.input.reset();
        }
    }

    createText(): void {
        if(this.text < this.textMax) {

            let random = this.random(0, this.listText.length - 1);
            let text = this.listText[random];
            let text2 = text.split(' ');
            let random2 = this.random(0, text2.length - 1);
            text = text2[random2];
            // chuyển text về chữ thường
            text = text.toLowerCase();

            if(this.RunText.findIndex(e => e === text) === -1) {
                this.RunText.push(text);
            }

            let demo = find("string/demo", this.node);
            let node = instantiate(demo);
            node.parent = find("string", this.node);
            node.active = true;
            this.text++;
            node.name = text;
            node.getComponent(Label).string = text;

            // random color
            let colorR = this.random(0, 255);
            let colorG = this.random(0, 255);
            let colorB = this.random(0, 255);
            node.getComponent(Label).color = color(colorR, colorG, colorB);



            let width = view.getVisibleSize().width;

            let worldPosition = node.worldPosition;
            let posStart = worldPosition.clone();
            posStart.x = this.random(0, width);
            node.setWorldPosition(posStart);

            let posEnd = worldPosition.clone();
            posEnd.x = this.random(0, width);
            posEnd.y = 0;
            tween(node)
                .to(this.random(this.speed, 10), {worldPosition: posEnd})
                .call(() => {
                    this.text--;
                    this.life--;
                    this.renderTexture();
                    node.destroy();
                    if(this.life <=0) {
                        this.lose();
                    }
                })
                .start();

        }
    }

    run(): void {
        this.tips.active = false;
        this.node.active = true;
        this.point = 0;
        this.time = 0;
        this.life = 3;
        this.speed = 5;
        this.RunText = []
        this.textMax = 5;
        this.text = 0;

        this.renderTexture();

        let str = find("string", this.node);
        if(str) {
            let list = str.children;
            for(let i = 0; i < list.length; i++) {
                if(list[i].name !== 'demo') {
                    list[i].destroy();
                }
            }
        }
    }

    public renderTexture(): void {
        this.pointLabel.string = this.point.toString();
        let layout = this.layout.node.children;
        for(let i = 0; i < layout.length; i++) {
            let node = layout[i];
            node.active = false;
        }
        for(let i = 0; i < this.life; i++) {
            let node = layout[i];
            node.active = true;
        }

        if(this.point > 5) {
            this.speed = 4;
            this.textMax+=2;

        } else if(this.point > 10) {
            this.speed = 3;
            this.textMax+=4;
        }
        else if(this.point > 15) {
            this.speed = 2;
            this.textMax+=6;
        }
        else if(this.point > 20) {
            this.speed = 1;
            this.textMax += 8;
        }

    }

    public lose(): void {
        this.node.active = false;
        this.win.updatePoint(this.point);
    }

    random(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update(deltaTime: number) {
        this.time += deltaTime;
        this.timeLabel.string = this.time.toFixed(2);
        this.createText();
    }
}


