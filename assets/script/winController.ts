import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('winController')
export class winController extends Component {

    @property(Label)
    public pointLabel : Label = null;

    start() {

    }

    updatePoint(point: number): void {
        this.node.active = true;
        this.pointLabel.string = point.toString();
    }

    update(deltaTime: number) {
        
    }
}


