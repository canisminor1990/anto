import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';
import { GroupOrder } from './utils';

const option = {
  marginX: 100,
  marginY: 300,
};

export default () => {
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;

  const Artboards = _.filter(page.layers, l => l.type && l.type === 'Artboard');
  const sortedArtboards = _.sortBy(Artboards, ['frame.y', 'frame.x']);

  let X = sortedArtboards[0].frame.x;

  _.forEach(sortedArtboards, (layer, i) => {
    layer.moveToBack();
    if (i === 0) return;
    const preLayer = sortedArtboards[i - 1];
    const minY = Math.abs(layer.frame.y - preLayer.frame.y);
    if (minY < preLayer.frame.height / 3 || minY < layer.frame.height / 3) {
      layer.frame.y = preLayer.frame.y;
      layer.frame.x = preLayer.frame.x + preLayer.frame.width + option.marginX;
    } else {
      layer.frame.x = X;
      layer.frame.y = preLayer.frame.y + preLayer.frame.height + option.marginY;
    }
  });

  GroupOrder(page);
  UI.message('对齐成功');
};
