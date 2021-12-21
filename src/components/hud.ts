import { loadFonts  } from "../styles/font";
import { Selection, SelectionHander } from "../utils/selectionHandler";
import { Button } from "./button";



export interface Hud {
    selection: SelectionHander
    elements: any[]
}

export class Hud {
    constructor(){
        this.selection = Selection
        this.elements = []
    }
    button(label: string,icon: string,action: Function){
        let button = new Button(label,icon,action)
        this.elements.push(button)
    }
    async init(){
        await loadFonts()
    }
}