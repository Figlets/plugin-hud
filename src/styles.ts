export const white: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]

export const blue: Paint[] = [{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.09439179301261902,"g":0.625758171081543,"b":0.9825327396392822}}]

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