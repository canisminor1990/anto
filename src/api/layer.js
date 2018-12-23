import _ from 'lodash';

export default class SketchLayer {
  get(layer, name) {
    return _.filter(layer.layers, l => l.name === name);
  }

  getById(document, id) {
    return document.getLayerWithID(id);
  }

  deepGet(layer, name) {
    let layers = [];
    _.forEach(layer.layers, l => {
      if (l.name === name) layers.push(l);
      if (l.layers) layers.concat(this.deepGet(l.layers, name));
    });
    return layers;
  }

  globalGet(document, name) {
    try {
      return document.getLayersNamed(name);
    } catch (e) {
      return [];
    }
  }

  remove(layer, name) {
    _.forEach(layer.layers, l => {
      if (l.name === name) l.remove();
    });
  }

  deepRemove(layer, name) {
    _.forEach(layer.layers, l => {
      if (l.name === name) l.remove();
      if (l.layers) this.deepRemove(l.layers, name);
    });
  }

  globalRemove(document, name) {
    const layers = this.globalGet(document, name);
    if (layers.length > 0) _.forEach(layers, l => l.remove());
  }

  getArtboard(layer) {
    if (layer.parent.type === 'Artboard') return layer.parent;
    if (layer.parent.type === 'Page') return false;
    return this.getArtboard(layer.parent);
  }
}
