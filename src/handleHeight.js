import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';

export default () => {
  console.log('[Start]', 'handleHeight');
  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;

  if (selection.isEmpty) return UI.message('请选择画板');
  if (selection.layers.length > 1) return UI.message('请选择一个画板');
  let artboard;
  const FindArtboard = layer => {
    if (layer.parent.type === 'Artboard') return layer.parent;
    if (layer.parent.type === 'Page') return false;
    return FindArtboard(layer.parent);
  };
  if (selection.layers[0].type !== 'Artboard') {
    artboard = FindArtboard(selection.layers[0]);
    if (!artboard) return UI.message('请选择画板');
  } else {
    artboard = selection.layers[0];
  }

  let maxHeight = 0;
  _.forEach(artboard.layers, l => {
    const height = l.frame.y + l.frame.height;
    if (height > maxHeight) maxHeight = height;
  });
  artboard.frame.height = maxHeight;
  UI.message('高度已适配');
};
