import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';
import { GroupOrder, find } from './utils';

const option = {
  marginX: 100,
  marginY: 300,
};

export default () => {
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;

  const Artboards = _.filter(page.layers, l => l.type && l.type === 'Artboard');
  const sortedArtboards = _.sortBy(Artboards, ['frame.y', 'frame.x']);
  let ArtboardsGroup = {};

  let X = sortedArtboards[0].frame.x;
  let Y = sortedArtboards[0].frame.y;

  let oldX = sortedArtboards[0].frame.x;
  let oldY = sortedArtboards[0].frame.y;

  _.forEach(sortedArtboards, layer => {
    layer.moveToBack();
    layer.frame.x = X;
    layer.frame.y = Y;
  });

  GroupOrder(page);
  UI.message('对齐成功');
};
