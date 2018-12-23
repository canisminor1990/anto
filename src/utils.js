import UI from 'sketch/ui';
import _ from 'lodash';

// 找到唯一图层
export const find = (array, key, value) => {
  const result = _.filter(array, m => m[key] === value);
  return result.length > 0 ? result[0] : false;
};

// 选取指定图层
export const getLayer = (page, name) => {
  let getLayer = false;
  page.layers.forEach(layer => {
    if (layer.name === name) getLayer = layer;
  });
  return getLayer;
};

// 删除指定图层
export const removeLayer = (page, name) => {
  page.layers.forEach(layer => {
    if (layer.name === name) layer.remove();
  });
};

// 全局删除指定图层
export const globalRemoveLayer = (document, name) => {
  try {
    const layers = document.getLayersNamed(name);
    if (layers.length > 0) _.forEach(layers, layer => layer.remove());
  } catch (e) {
    console.log('globalRemoveLayer', e);
  }
};

// 设置Symbol的Override
export const setById = (instance, id, value) => {
  const result = _.filter(instance.overrides, o => o.id === id);
  if (result.length === 0) return UI.message(`请检查Override-${instance.name}`);
  instance.setOverrideValue(result[0], value);
};

export const setByValue = (instance, setByValue, value) => {
  const result = _.filter(instance.overrides, o => o.value === setByValue);
  if (result.length === 0) return UI.message(`请检查Override-${instance.name}`);
  instance.setOverrideValue(result[0], value);
};

// 排序
export const GroupOrder = page => {
  const GorupTop = find(page.layers, 'name', '@置顶');
  const GroupLine = find(page.layers, 'name', '@交互连线');
  const GroupTitle = find(page.layers, 'name', '@画板标题');
  const GroupShadow = find(page.layers, 'name', '@画板投影');
  const GorupBottom = find(page.layers, 'name', '@置底');
  const GroupBg = find(page.layers, 'name', '@制版');

  if (GroupTitle) GroupTitle.moveToFront();
  if (GroupLine) GroupLine.moveToFront();
  if (GorupTop) GorupTop.moveToFront();

  if (GroupShadow) GroupShadow.moveToBack();
  if (GorupBottom) GorupBottom.moveToBack();
  if (GroupBg) GroupBg.moveToBack();
};
