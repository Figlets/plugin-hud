import {Button} from "../components/button";
import {Stack} from "../components/stack"
import {black, hudShadow, padding} from "../styles"

export interface Menu extends FrameNode {
label: string
icon: string
items: Button[]
button: Button
menu: Stack
}

export class Menu {

constructor(label: string,icon:string,items: Button[]){
    const openButton = new Button(label,icon, () => this.openMenu())
    this.menu = new Stack("VERTICAL", 8, ' ')
    this.menu.container.visible = false
    padding(this.menu.container,8)
    this.menu.container.fills = black
    this.menu.container.effects = hudShadow
    this.menu.container.cornerRadius = 4
    this.button = openButton
    items.forEach(item => this.menu.container.appendChild(item.container))

    figma.on('close', () => {
        try{this.menu.container.remove()}catch(e){

        }
    })

    figma.on('selectionchange', () => {
        if(figma.currentPage.selection[0].parent == this.menu.container){
            console.log("The parent it the menu")
            this.closeMenu()
        }
    })

    return this
}
openMenu(){
    console.log("opening!")
    this.menu.container.visible = true
    this.menu.container.x = this.button.container.absoluteTransform[0][2]
    this.menu.container.y = this.button.container.absoluteTransform[1][2]  + this.button.container.height + 8
}
closeMenu(){
    console.log("closing!")
    this.menu.container.visible = false
}
}