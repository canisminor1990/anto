import _ from 'lodash';

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
    return this.page.selectedLayers();
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

  addLayers(group, layer) {
    group.addLayers(_.isArray(layer) ? layer : [layer]);
  }

  setSeleted(layer) {
    layer.select_byExtendingSelection(true, true);
  }

  setExport(layer, scale) {
    const size = layer.exportOptions().addExportFormat();
    size.setAbsoluteSize(0);
    size.setVisibleScaleType(0);
    size.setFileFormat('png');
    size.setNamingScheme(0);
    size.setScale(scale);
  }
}
