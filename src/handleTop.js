import sketch from 'sketch/dom';

export default () => {
  console.log('[Start]', 'handleTop');

  const document = sketch.getSelectedDocument();
  const selectPage = document.selectedPage;
  const selection = document.selectedLayers;

  selection.forEach(layer => {
    try {
      const rect = layer.frame;
      const newRect = rect.changeBasis({ from: layer.parent, to: selectPage });
      layer.frame = newRect;
      layer.parent = selectPage;
    } catch (e) {
      console.log(e);
    }
  });
};
