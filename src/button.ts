
const white: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]

const blue: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.09439179301261902,"g":0.625758171081543,"b":0.9825327396392822}}]

const interRegular: FontName = {
			family: "Inter",
			style: "Regular"
			}
const interMedium: FontName = {
			family: "Inter",
			style: "Medium"
}
export async function loadFonts() {
	await Promise.all([
		figma.loadFontAsync(interRegular),
		figma.loadFontAsync(interMedium)
	])
}


export interface Button extends FrameNode {
self: Button
action: () => void
container: FrameNode
button: FrameNode
label: string
labelNode: TextNode
sel: SceneNode[]
}

export class Button{
	container: FrameNode
	button: FrameNode
    labelNode: TextNode
	label: string
	sel: SceneNode[]
	state: any
	constructor(label: string, action: () => void){
        
		this.state = 0
		this.action = action
		this.label = label
		var self = this;
		({container: this.container, button: this.button, labelNode: this.labelNode} =  this.render())
        this.sel = [...figma.currentPage.selection]
        

        figma.on('selectionchange', () => {
            if(figma.currentPage.selection.length == 1 && figma.currentPage.selection[0] == this.button || figma.currentPage.selection[0] == this.container){
                figma.currentPage.selection = this.sel ? [...this.sel] : []
                this.redraw()
                this.action()
            } else {
            this.sel = figma.currentPage.selection ? [...figma.currentPage.selection] : [];
            }
        })
        figma.on('close', () => {
            try{
            this.remove()
            } catch(e){
    
            }
        })


		return self
	}
	render() {
        
		this.container = figma.createFrame()
		this.container.name = " "


		this.button = figma.createFrame()
		this.button.name = "Button"
		this.button.fills = blue
		this.button.primaryAxisSizingMode = "AUTO"
		this.button.counterAxisSizingMode = "AUTO"
		this.button.cornerRadius = 6
		this.button.paddingLeft = 12
		this.button.paddingRight = 12
		this.button.paddingTop = 8
		this.button.paddingBottom = 8
		this.button.counterAxisAlignItems = "CENTER"
		this.button.layoutMode = "HORIZONTAL"
		this.button.counterAxisSizingMode = "AUTO"
		this.button.itemSpacing = 8

  
            this.labelNode = figma.createText()
            this.labelNode.fontName = interRegular
            this.labelNode.fontName = {"family":"Inter","style":"Medium"}
            this.labelNode.fontSize = 11
            this.labelNode.letterSpacing = {"unit":"PERCENT","value":1}
            this.labelNode.lineHeight = {"unit":"PIXELS","value":16}
            this.labelNode.characters = this.label
            this.labelNode.fills = white
        

		this.button.appendChild(this.labelNode)
		this.container.appendChild(this.button)
		this.container.fills = []
		this.container.resize(this.button.width,this.button.height)

        return {button: this.button, container: this.container, labelNode: this.labelNode}
	}

	remove(){
		this.container.remove()
	}

	redraw(){
		this.remove()
		this.render()
	}
	addCount(){
		this.label = 'Count: ' + (++this.state).toString()
	}
}





