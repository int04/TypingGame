import { _decorator, Component, Node, find } from 'cc';
import {gameController} from "db://assets/script/gameController";
const { ccclass, property } = _decorator;

@ccclass('BoxController')
export class BoxController extends Component {
    @property(Node)
    public game : Node = null;
    start() {
        this.node.active =true;
    }

    public player(): void {
        this.game.getComponent(gameController).run();
        let win = find("main/win");
        win.active = false;
    }


    update(deltaTime: number) {
        
    }
}


