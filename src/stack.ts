// // Create FRAME
// export function stack(){
// var frame = figma.createFrame()
// frame.resize(109.0000000000, 59.0000000000)
// frame.primaryAxisSizingMode = "AUTO"
// frame.counterAxisSizingMode = "AUTO"
// frame.name = "Frame 2"
// frame.widgetEvents = []
// frame.relativeTransform = [[1,0,750],[0,1,-150]]
// frame.x = 750
// frame.y = -150
// frame.paddingLeft = 10
// frame.paddingRight = 10
// frame.paddingTop = 10
// frame.paddingBottom = 10
// frame.layoutMode = "HORIZONTAL"
// frame.counterAxisSizingMode = "AUTO"
// frame.itemSpacing = 10
// figma.currentPage.appendChild(frame)
// }

export interface Stack extends FrameNode {
    self: Stack
    container: FrameNode
    name: string
    direction: "HORIZONTAL" | "VERTICAL"
    spacing: number
    }

export class Stack{
    constructor(direction: "HORIZONTAL" | "VERTICAL",spacing: number, name: string){
        this.container = figma.createFrame()
        this.container.primaryAxisSizingMode = "AUTO"
        this.container.counterAxisSizingMode = "AUTO"
        this.container.name = name
        this.container.layoutMode = direction
        this.container.itemSpacing = spacing

        var self = this
        return self
    }
    
}