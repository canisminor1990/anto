import _ from 'lodash';
import moment from 'moment';
import { join } from 'path';

export default class SketchNative {
  get context() {
    return NSDocumentController.sharedDocumentController();
  }

  get document() {
    return this.context.currentDocument();
  }

  get pages() {
    return this.document.pages();
  }

  get page() {
    return this.document.currentPage();
  }

  get selection() {
    return this.document.selectedLayers();
  }

  get firstSelectLayer() {
    return this.selection.layers()[0];
  }

  setName(layer, name) {
    layer.setName(name);
  }

  setLocked(layer, bool = true) {
    layer.setIsLocked(bool);
  }

  setVisible(layer, bool = true) {
    layer.setIsVisible(bool);
  }

  setX(layer, x) {
    layer.frame().setX(x);
  }

  setY(layer, y) {
    layer.frame().setY(y);
  }

  setWidth(layer, width) {
    layer.frame().setWidth(width);
  }

  setHeight(layer, height) {
    layer.frame().setHeight(height);
  }

  moveToFront(layer) {
    MSLayerMovement.moveToFront(_.isArray(layer) ? layer : [layer]);
  }

  remove(layer) {
    layer.parentGroup().removeLayer(layer);
  }

  addLayers(group, layer) {
    group.addLayers(_.isArray(layer) ? layer : [layer]);
  }

  setSeleted(layer) {
    layer.select_byExtendingSelection(true, true);
  }

  setSlice(layer, name, size = 1, type = 'x') {
    const sliceLayer = MSSliceLayer.new();
    this.setName(sliceLayer, name);
    this.setLocked(sliceLayer);
    this.setVisible(sliceLayer, false);
    this.setX(sliceLayer, layer.frame.x);
    this.setY(sliceLayer, layer.frame.y);
    this.setWidth(sliceLayer, layer.frame.width);
    this.setHeight(sliceLayer, layer.frame.height);
    this.setExport(sliceLayer, size, type);
    return sliceLayer;
  }

  setExport(layer, size = 1, type = 'x') {
    const Slice = layer.exportOptions().addExportFormat();
    Slice.setFileFormat('png');
    Slice.setNamingScheme(0);
    if (type === 'w') {
      Slice.setVisibleScaleType(1);
      Slice.setScale(0);
      Slice.setAbsoluteSize(parseInt(size, 10));
    } else if (type === 'w') {
      Slice.setVisibleScaleType(2);
      Slice.setScale(0);
      Slice.setAbsoluteSize(parseInt(size, 10));
    } else if (type === 'x') {
      Slice.setVisibleScaleType(0);
      Slice.setScale(parseInt(size, 10));
      Slice.setAbsoluteSize(0);
    }
  }

  exportSlice(slice, path) {
    this.document.saveArtboardOrSlice_toFile(slice, join(path, String(slice.name()) + '.png'));
  }
}
