import _ from 'lodash';
import Sketch from '../sketch';

export default class handleLayout extends Sketch {
  constructor() {
    super();
    this.namespace = '对齐|handleLayout';
    this.option = {
      marginX: 100,
      marginY: 300,
    };
  }

  run() {
    const sortedArtboards = _.sortBy(this.artboards, ['frame.y', 'frame.x']);

    const snapDistance =
      sortedArtboards.reduce((initial, artboard) => {
        initial += artboard.frame.height;
        return initial;
      }, 0) / sortedArtboards.length;

    sortedArtboards.forEach(artboard => {
      artboard.frame.y = this.snapValueToGrid(artboard.frame.y, snapDistance);
    });

    const artboardRows = sortedArtboards.reduce((initial, artboard) => {
      initial.push(artboard.frame.y);
      return initial;
    }, []);

    const baseFrame = sortedArtboards[0].frame;
    let artboardY = baseFrame.y;
    let currentRow = 0;

    _.uniq(artboardRows).forEach(rowValue => {
      let tallestArtboard = 0;
      let artboardX = baseFrame.x;

      const artboardsInRow = sortedArtboards.filter(artboard => artboard.frame.y === rowValue);
      _.sortBy(artboardsInRow, 'frame.x').forEach(artboard => {
        artboard.frame.x = artboardX;
        artboard.frame.y = artboardY;
        artboardX += artboard.frame.width + this.option.marginX;
        if (artboard.frame.height > tallestArtboard) tallestArtboard = artboard.frame.height;
      });

      artboardY += tallestArtboard + this.option.marginY;

      currentRow++;
    });

    this.sortOrder();
    this.ui.success('对齐成功');
  }

  snapValueToGrid(value, grid) {
    let div = value / grid;
    const rest = div - Math.floor(div);
    if (rest > 0.8) {
      div += 1;
    }
    return Math.floor(Math.floor(div) * grid);
  }
}
