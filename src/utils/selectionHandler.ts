import { sleep } from './utils';
export interface SelectionHander {
  history: SceneNode[][];
}

export class SelectionHander {
  constructor() {
    this.history = [];
    this.history.push([...figma.currentPage.selection]);

    figma.on('selectionchange', () => {
      if (
        figma.currentPage.selection.length > 0 &&
        figma.currentPage.selection[0].getPluginData('hud') == 'true'
      ) {
        sleep(1).then((_) => {
          //Figma selection change is async, so we wait a millisecond
          figma.currentPage.selection = [...this.history[0]];
          //Remove added element from the extra array push. (Might be a better way to do this)
          this.history.shift();
        });
      } else {
        this.push([...figma.currentPage.selection]);
      }
    });
    return this;
  }
  push(sel: SceneNode[]) {
    this.history.unshift(sel);
    this.history.length > 10 ? this.history.pop() : null;
    console.log(this.history);
  }
}

export const Selection = new SelectionHander();
