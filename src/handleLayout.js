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
  const minX = _.sortBy(Artboards, ['frame.x'])[0].frame.x;
  let ArtboardsGroup = {};

  _.forEach(sortedArtboards, layer => {
    layer.moveToBack();

    const isFirstGroup = Object.keys(ArtboardsGroup).length === 0;
    let isFirstChild = false;
    const Y = layer.frame.y;

    if (!ArtboardsGroup[Y]) {
      isFirstChild = true;

      ArtboardsGroup[Y] = {
        index: 0,
        y: Y,
        maxHeight: layer.frame.height,
        children: [],
      };

      if (!isFirstGroup) {
        const index = Object.keys(ArtboardsGroup).length - 1;
        const preGroupKey = Object.keys(ArtboardsGroup)[index - 1];
        const preGroup = ArtboardsGroup[preGroupKey];
        ArtboardsGroup[Y].index = index;
        ArtboardsGroup[Y].y = preGroup.y + preGroup.maxHeight + parseFloat(option.marginY);
      }
    }

    const Group = ArtboardsGroup[Y];
    const rect = new sketch.Rectangle(layer.frame);
    if (rect.height > Group.maxHeight) Group.maxHeight = rect.height;
    if (!isFirstChild) {
      const LastChild = _.last(Group.children).frame;
      rect.x = LastChild.x + LastChild.width + parseFloat(option.marginX);
    } else {
      rect.x = minX;
    }
    rect.y = Group.y;
    layer.frame = rect;
    ArtboardsGroup[Y].children.push(layer);
  });

  GroupOrder(page);
  UI.message('对齐成功');
};
