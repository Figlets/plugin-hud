export interface Hud extends FrameNode{
container: FrameNode
animationloop: any
}

export class Hud{
    container: FrameNode
constructor(){
    var self = this
    this.container = figma.createFrame()
    this.container.name = "HUD"
    this.animationloop = null

    figma.on('close', () => {
        try{
        this.remove()
        } catch(e){

        }
    })

    return self
}
animate(doAnimation: boolean){
    if(doAnimation){
       this.animationloop =  setInterval(() => {this.matchViewport()}, 1000/120)
    } else {
        clearInterval(this.animationloop)
    }
}
matchViewport(){
    this.container.x = figma.viewport.bounds.x
    this.container.y = figma.viewport.bounds.y
}
remove(){
    this.container.remove()
}


}