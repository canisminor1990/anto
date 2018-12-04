import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';
import { GroupOrder } from './utils';

export default () => {
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;

  const Artboards = _.filter(page.layers, l => l.type && l.type === 'Artboard');
  const sortedArtboards = _.sortBy(Artboards, ['frame.y', 'frame.x']);

  _.forEach(sortedArtboards, layer => layer.moveToBack());

  GroupOrder(page);
  UI.message('排序成功');
};
