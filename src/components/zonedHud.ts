import { Tween, Queue, Easing } from 'tweeno';
import { padding, styleHudZone } from '../styles/style';

export interface zonedHud extends FrameNode {
  container: FrameNode;
  animationloop: any;
  animationSettings: any;

  zoomLevel: number;

  interactiveContainer: FrameNode;
  zoneContainer: FrameNode;
  topRow: FrameNode;
  centerRow: FrameNode;
  bottomRow: FrameNode;
  top: FrameNode;
  topLeft: FrameNode;
  topRight: FrameNode;
  left: FrameNode;
  center: FrameNode;
  right: FrameNode;
  bottomLeft: FrameNode;
  bottom: FrameNode;
  bottomRight: FrameNode;
}

export class zonedHud {
  container: FrameNode;
  animationSettings: any;
  constructor() {
    var self = this;
    this.container = figma.createFrame();
    this.container.name = 'HUD';
    this.container.x = figma.viewport.bounds.x;
    this.container.y = figma.viewport.bounds.y;
    this.zoomLevel = figma.viewport.zoom
    padding(this.container,40)

    this.zoneContainer = figma.createFrame();
    this.container.appendChild(this.zoneContainer);

    this.zoneContainer.clipsContent = false;
    this.zoneContainer.primaryAxisSizingMode = "FIXED"
    this.zoneContainer.constraints = {"horizontal":"SCALE","vertical":"SCALE"}
    this.zoneContainer.layoutMode = 'VERTICAL';
    this.zoneContainer.fills = []
    padding(this.zoneContainer,40)

    this.interactiveContainer = figma.createFrame()
    this.interactiveContainer.resize(1,1)
    this.interactiveContainer.clipsContent = false;
    this.interactiveContainer.constraints = {"horizontal":"MIN","vertical":"MIN"}
    this.interactiveContainer.fills = []
    this.container.appendChild(this.interactiveContainer)


    this.topRow = figma.createFrame();
    this.centerRow = figma.createFrame();
    this.bottomRow = figma.createFrame();

    this.zoneContainer.appendChild(this.topRow);
    this.zoneContainer.appendChild(this.centerRow);
    this.zoneContainer.appendChild(this.bottomRow);

    this.topLeft = figma.createFrame();
    this.top = figma.createFrame();
    this.topRight = figma.createFrame();

    this.left = figma.createFrame();
    this.center = figma.createFrame();
    this.right = figma.createFrame();

    this.bottomRight = figma.createFrame();
    this.bottom = figma.createFrame();
    this.bottomLeft = figma.createFrame();

    this.topRow.appendChild(this.topLeft);
    this.topRow.appendChild(this.top);
    this.topRow.appendChild(this.topRight);

    this.centerRow.appendChild(this.left);
    this.centerRow.appendChild(this.center);
    this.centerRow.appendChild(this.right);

    this.bottomRow.appendChild(this.bottomLeft);
    this.bottomRow.appendChild(this.bottom);
    this.bottomRow.appendChild(this.bottomRight);



    (this.topRow.children as FrameNode[]).forEach(zone => { 
        zone.primaryAxisAlignItems = "MIN"
    });
   (this.centerRow.children as FrameNode[]).forEach(zone => {
        zone.primaryAxisAlignItems = "CENTER"
    });
    (this.bottomRow.children as FrameNode[]).forEach(zone => {
        zone.primaryAxisAlignItems = "MAX"
    });

    [this.topLeft,this.left,this.bottomLeft].forEach(zone => {
        zone.counterAxisAlignItems = "MIN"
    });
    [this.top,this.center,this.bottom].forEach(zone => {
        zone.counterAxisAlignItems = "CENTER"
    });
    [this.topRight,this.right,this.bottomRight].forEach(zone => {
        zone.counterAxisAlignItems = "MAX"
    })

  

    const rows = [this.topRow, this.centerRow, this.bottomRow];
    const zones = [
      this.topLeft,
      this.top,
      this.topRight,
      this.left,
      this.center,
      this.right,
      this.bottomLeft,
      this.bottom,
      this.bottomRight,
    ];

    rows.forEach(row => {
      row.layoutAlign = 'STRETCH';
      row.layoutGrow = 1;
      row.fills = [];
      row.clipsContent = false;
      row.primaryAxisSizingMode = 'FIXED';
      row.layoutMode = 'HORIZONTAL';
      row.layoutAlign = 'STRETCH';
      row.expanded = false;
    });
    zones.forEach((node,index) => {
      styleHudZone(node)
      node.name = index.toString()
      node.primaryAxisSizingMode = 'FIXED';
      node.layoutMode = 'VERTICAL';
      node.layoutAlign = 'STRETCH';
      node.layoutGrow = 1;
      node.expanded = false;
    });




    this.container.resize(
      figma.viewport.bounds.width * this.zoomLevel,
      figma.viewport.bounds.height * this.zoomLevel
    );
    this.container.rescale(1/this.zoomLevel)


    this.container.expanded = false;

    this.animationloop = null;
    this.animationSettings = {
      settings: {
        from: {
          x: this.container.x,
          y: this.container.y,
          scale: this.zoomLevel,
        },
        to: {
          x: figma.viewport.bounds.x,
          y: figma.viewport.bounds.y,
          scale: figma.viewport.zoom,
        },
        repeat: 0,
        easing: Easing.Cubic.InOut,
      },
      queue: {},
      target: {},
      tween: {},
      loop: {},
    };

    figma.on('close', () => {
      try {
        //this.remove();
      } catch (e) {}
    });

    return self;
  }

  animate(doAnimation: boolean) {
    if (doAnimation) {
      this.matchViewport();
      this.animationloop = setInterval(() => {
        this.matchViewport();
      }, 400);
    } else {
      clearInterval(this.animationloop);
    }
  }


 
  matchViewport() {
    const container = this.container;

    let origCoords = {
      x: this.container.x,
      y: this.container.y,
      width: this.container.width,
      height: this.container.height,
      scale: this.zoomLevel,
    };

    this.animationSettings.settings = {
      from: origCoords,
      to: {
        x:figma.viewport.bounds.x,
        y: figma.viewport.bounds.y,
        width: figma.viewport.bounds.width,
        height: figma.viewport.bounds.height,
        scale: figma.viewport.zoom,
      },
      duration: 200,
      repeat: 0,
      easing: Easing.Quadratic.InOut,
    };

    const zoom = (scale: number) => {
        this.zoomLevel/scale !== 1 ? this.container.rescale(this.zoomLevel / scale) : null;
        this.zoomLevel = scale
    }

    this.animationSettings.target = {
     
      x: origCoords.x,
      y: origCoords.y,
      width: origCoords.width,
      height: origCoords.height,
      scale: origCoords.scale,
      update: function(){
        container.name = this.scale.toString()  
        container.x = this.x,
        container.y = this.y
        if(this.width * this.scale !== container.width * this.scale) {
            container.resizeWithoutConstraints(this.width*this.scale,this.height*this.scale)
        }
        zoom(this.scale)
      },
    };
    
    this.animationSettings.queue = new Queue();
    this.animationSettings.tween = new Tween(
      this.animationSettings.target,
      this.animationSettings.settings
    );
    this.animationSettings.queue.add(this.animationSettings.tween);
    this.animationSettings.queue.start();

    this.animationSettings.loop = setInterval(() => {
      if (this.animationSettings.queue.length === 0) {
        clearInterval(this.animationSettings.loop);
      } else {
        this.animationSettings.queue.update();
        this.animationSettings.target.update();
      }
    });
  }


  lockViewport(bool: boolean) {
    let lock;
    if (bool) {
      lock = setInterval(() => {
        figma.viewport.center = {
          x: this.container.x + this.container.width / 2,
          y: this.container.y + this.container.height / 2,
        };
      }, 1);
    } else {
      clearInterval(lock);
    }
  }

  remove() {
    this.container.remove();
  }
}
