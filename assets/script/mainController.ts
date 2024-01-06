import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mainController')
export class mainController extends Component {
    @property(Node)
    public tips : Node = null;
    start() {
        this.tips.active = true;
    }

    update(deltaTime: number) {
        
    }
}


