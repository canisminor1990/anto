import sketch from 'sketch/dom';
import UI from 'sketch/ui';

export default () => {
  console.log('[Start]', 'handleDash');

  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;
  if (selection.isEmpty) return UI.message('请选择线条');
  if (selection.length > 1) return UI.message('不能大于一个图层');
  const Line = selection.layers[0];
  const dash = Line.style.borderOptions.dashPattern;
  console.log(dash);
  if (!dash || dash.toString() === [0, 0, 0, 0].toString()) {
    Line.style.borderOptions.dashPattern = [4, 6, 4, 6];
  } else {
    Line.style.borderOptions.dashPattern = [0, 0, 0, 0];
  }
};
