export const white: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]

export const blue: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.09439179301261902,"g":0.625758171081543,"b":0.9825327396392822}}]

export const black: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]

export const hudShadow: Effect[] = [{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.2},"offset":{"x":0,"y":5},"radius":17,"spread":0,"visible":true,"blendMode":"NORMAL"},{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.15},"offset":{"x":0,"y":2},"radius":7,"spread":0,"visible":true,"blendMode":"NORMAL"}]


export function styleHudZone(node: FrameNode){
node.fills = []
node.strokes = white
node.strokeWeight = 0.5
padding(node,2)
node.backgrounds = []

}

export function padding(node: BaseFrameMixin, padding: number | number[]){
    if(typeof padding === "number"){
        node.paddingTop = node.paddingRight = node.paddingBottom = node.paddingLeft = padding
    } else {
        try{
            node.paddingTop = padding[0]
            node.paddingRight = padding[1]
            node.paddingBottom = padding[2]
            node.paddingLeft = padding[3]
        } catch(e){
            console.error(e)
        }
    }
}




// // Create STYLE
// var hud_shadow_9329 = figma.createEffectStyle()
// hud_shadow_9329.name = "HUD shadow"
// hud_shadow_9329.effects = [{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.20000000298023224},"offset":{"x":0,"y":5},"radius":17,"spread":0,"visible":true,"blendMode":"NORMAL","showShadowBehindNode":true},{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.15000000596046448},"offset":{"x":0,"y":2},"radius":7,"spread":0,"visible":true,"blendMode":"NORMAL","showShadowBehindNode":true}]

// // Create STYLE
// var background___black_f1e8 = figma.createPaintStyle()
// background___black_f1e8.name = "Background / Black"
// background___black_f1e8.paints = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]

// // Create RECTANGLE
// var rectangle_101_18074 = figma.createRectangle()
// rectangle_101_18074.effectStyleId = hud_shadow_9329.id
// rectangle_101_18074.fillStyleId = background___black_f1e8.id
// rectangle_101_18074.resize(160.0000000000, 105.0000000000)
// rectangle_101_18074.name = "background"
// rectangle_101_18074.widgetEvents = []
// rectangle_101_18074.strokes = [{"type":"SOLID","visible":true,"opacity":0.10000000149011612,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]
// rectangle_101_18074.strokeWeight = 0.5
// rectangle_101_18074.strokeAlign = "OUTSIDE"
// rectangle_101_18074.constraints = {"horizontal":"SCALE","vertical":"SCALE"}
// rectangle_101_18074.cornerRadius = 2
// frame_101_18073.appendChild(rectangle_101_18074)