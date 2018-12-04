import sketch from 'sketch/dom';
import UI from 'sketch/ui';

export default () => {
  console.log('[Start]', 'handleChange');

  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;
  if (selection.isEmpty) return UI.message('请选择线条');
  if (selection.length > 1) return UI.message('不能大于一个图层');
  const Line = selection.layers[0];
  const Start = Line.style.borderOptions.startArrowhead;
  const End = Line.style.borderOptions.endArrowhead;
  Line.style.borderOptions.startArrowhead = End;
  Line.style.borderOptions.endArrowhead = Start;
  UI.message('变更成功');
};
