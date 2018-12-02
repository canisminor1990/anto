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
  const layers = document.getLayersNamed(name);
  if (layers.length > 0) _.forEach(layers, layer => layer.remove());
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
