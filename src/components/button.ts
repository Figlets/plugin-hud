import { blue, padding, white } from '../styles/style';
import { interRegular } from '../styles/font';

export interface Button extends FrameNode {
  self: Button;
  action: Function;
  container: FrameNode;
  button: FrameNode;
  label: string;
  labelNode: TextNode;
  sel: SceneNode[];
  iconNode: FrameNode | null;
}

export class Button {
  container: FrameNode;
  button: FrameNode;
  labelNode: TextNode;
  label: string;
  sel: SceneNode[];
  state: any;
  iconData: any;
  iconNode: FrameNode | null;
  constructor(label: string, icon: String, action: Function) {
    var self = this;
    this.state = 0;
    this.action = action;
    this.label = label;
    ({
      container: this.container,
      button: this.button,
      labelNode: this.labelNode,
      iconNode: this.iconNode,
    } = this.render());
    this.sel = [...figma.currentPage.selection];

    if (icon !== null) {
      this.iconData = icon;
      //this.iconNode = figma.createNodeFromSvg(this.iconData);
    }
    this.redraw();

    figma.on('selectionchange', () => {
      if (
        figma.currentPage.selection.length == 1 &&
        figma.currentPage.selection[0] == this.container ||
        figma.currentPage.selection.length == 1 &&
        figma.currentPage.selection[0] == this.button
      ) {
        this.action();

      } else {

      }
    });
    figma.on('close', () => {
      try {
        // this.remove()
      } catch (e) {}
    });

    return self;
  }
  render() {
    this.container = figma.createFrame();
    this.container.name = ' ';

    this.button = figma.createFrame();

    this.button.name = 'Button';
    this.button.fills = blue;
    this.button.primaryAxisSizingMode = 'AUTO';
    this.button.counterAxisSizingMode = 'AUTO';
    this.button.cornerRadius = 6;

    this.button.counterAxisAlignItems = 'CENTER';
    this.button.layoutMode = 'HORIZONTAL';
    this.button.counterAxisSizingMode = 'AUTO';
    this.label.length
      ? (this.button.itemSpacing = 8)
      : (this.button.itemSpacing = 0);
    this.label.length
      ? padding(this.button, [8, 12, 8, 12])
      : padding(this.button, 0);

    this.labelNode = figma.createText();
    this.labelNode.fontName = interRegular;
    this.labelNode.fontName = { family: 'Inter', style: 'Medium' };
    this.labelNode.fontSize = 11;
    this.labelNode.letterSpacing = { unit: 'PERCENT', value: 1 };
    this.labelNode.lineHeight = { unit: 'PIXELS', value: 16 };
    this.labelNode.characters = this.label;
    this.labelNode.fills = white;

    this.button.appendChild(this.labelNode);


    if(this.iconData && this.iconNode == undefined || this.iconData && this.iconNode.removed == true){
    
      this.iconNode = figma.createNodeFromSvg(this.iconData)
      this.iconNode.children.forEach((n: any) => (n.fills = white));
      this.button.appendChild(this.iconNode)
    }



    // if (this.iconNode.removed = false) {
    //   console.log(this.iconNode)
    //   this.button.appendChild(this.iconNode);
    //   console.log('appended iconNode')
    //   this.iconNode.children.forEach((n: any) => (n.fills = white));
    // } else {
    //   this.iconNode = this.iconData
    //   ? figma.createNodeFromSvg(this.iconData)
    //   : null;
    // }




    this.container.appendChild(this.button);
  
    this.container.fills = [];
    this.container.resize(
      this.button.width > 0.01 ? this.button.width : 32,
      this.button.height > 0.01 ? this.button.height : 32
    );
    this.container.expanded = false;
    this.container.rescale(1 / figma.viewport.zoom);


    this.button.children.forEach(child => child.locked = true)
    this.container.setPluginData('hud','true')
    this.button.setPluginData('hud','true')

    return {
      button: this.button,
      container: this.container,
      labelNode: this.labelNode,
      iconNode: this.iconNode,
    };

   

  }

  remove() {
    this.container.remove();
  }

  redraw() {
    console.log('redrawing', this);
    let x = this.container.x;
    let y = this.container.y;
    let parent = this.container.parent;
    let index = parent?.children?.indexOf(this.container);
    console.log(parent,index)
    this.remove();
    this.render();
    index !== undefined && index > -1
      ? parent?.insertChild(index, this.container)
      : parent?.appendChild(this.container);
    this.container.x = x;
    this.container.y = y;
  }

  async setLabel(str: string){
    await(figma.loadFontAsync(this.labelNode.fontName as FontName))
    this.labelNode.characters = str
    this.label = str
  }

  icon(svg: String) {
    this.iconData = svg;
    this.redraw();
  }
}
