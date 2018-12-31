import sketch from 'sketch/dom';
import _ from 'lodash';
export default class SketchCreate {
  group(config) {
    return new sketch.Group(
      _.defaults(config, {
        frame: {
          x: -50000,
          y: -50000,
          width: 100000,
          height: 100000,
        },
        layers: [],
      })
    );
  }

  page(config) {
    return new sketch.Page(config);
  }

  artboard(config) {
    return new sketch.Artboard(config);
  }

  shape(config) {
    return new sketch.Shape(config);
  }

  image(config) {
    return new sketch.Image(config);
  }

  text(config) {
    return new sketch.Text(config);
  }

  symbolMaster(artboard) {
    return new sketch.SymbolMaster.fromArtboard(artboard);
  }

  instance(master) {
    return master.createNewInstance();
  }

  slice() {
    return MSSliceLayer.new();
  }
}
