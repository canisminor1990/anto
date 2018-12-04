import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import { find, GroupOrder } from './utils';

export default () => {
  console.log('[Start]', 'handleTop');

  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
  const selection = document.selectedLayers;

  const Groups = find(page.layers, 'name', '@置顶');
  const Group =
    Groups ||
    new sketch.Group({
      name: '@置顶',
      frame: {
        x: -50000,
        y: -50000,
        width: 100000,
        height: 100000,
      },
      parent: page,
      layers: [],
    });

  selection.forEach(layer => {
    try {
      const rect = layer.frame;
      const newRect = rect.changeBasis({ from: layer.parent, to: Group });
      layer.frame = newRect;
      layer.parent = Group;
    } catch (e) {
      console.log(e);
    }
  });

  Group.locked = true;
  GroupOrder(page);

  UI.message('置顶成功');
};
