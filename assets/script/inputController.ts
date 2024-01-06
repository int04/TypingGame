import { _decorator, Component, Node, EditBox, find } from 'cc';
import {gameController} from "db://assets/script/gameController";
const { ccclass, property } = _decorator;

@ccclass('inputController')
export class inputController extends Component {
    start() {
        let editBox = this.node.getComponent(EditBox);
        // get content text when press
        let game = find("main/game");
        // @ts-ignore
        editBox._editBoxTextChanged = (editBox: any, text: any) => {
            game.getComponent(gameController).checkText(editBox);
        }

    }

    reset(): void {
        let editBox = this.node.getComponent(EditBox);
        editBox.string = '';
        editBox.focus();
    }

    update(deltaTime: number) {

        let editBox = this.node.getComponent(EditBox);
        // check is focus
        if(editBox.isFocused()) {
        }
        else {

            editBox.focus();
        }

    }
}


