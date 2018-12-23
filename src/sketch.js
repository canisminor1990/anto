import _ from 'lodash';
import sketch from 'sketch/dom';
import Settings from 'sketch/settings';
import SketchLayer from './api/layer';
import SketchCreate from './api/create';
import sketchUI from './api/ui';
import SketchSetting from './api/setting';
import SketchLibrary from './api/library';

export default class Sketch {
  constructor() {
    this.namespace = 'Anto';
  }

  // UI
  get ui() {
    return new sketchUI();
  }

  get library() {
    return new SketchLibrary();
  }

  get create() {
    return new SketchCreate();
  }

  get layer() {
    return new SketchLayer();
  }

  get setting() {
    return new SketchSetting();
  }

  // Setting
  get line() {
    return this.setting.getDocument(this.document, 'anto-line');
  }

  set line(e) {
    return this.setting.setDocument(this.document, 'anto-line', e);
  }

  getLine(aId, bId) {
    const data = this.line;
    if (!data) this.line = {};
    if (!data || !data[aId] || !data[aId][bId]) return false;
    return this.layer.getById(this.document, data[aId][bId]);
  }

  setLine(aId, bId, lineId) {
    const data = this.line;
    if (!data) this.line = {};
    if (!data[aId]) data[aId] = {};
    if (!data[bId]) data[bId] = {};
    data[aId][bId] = lineId;
    data[bId][aId] = lineId;
    this.line = data;
    console.log(this.line);
  }

  get mode() {
    return this.setting.get('panel-mode');
  }

  set mode(e) {
    return this.setting.set('panel-mode', e);
  }

  // Document
  get document() {
    return sketch.getSelectedDocument();
  }

  get page() {
    return this.document.selectedPage;
  }

  // selection

  get selection() {
    return this.document.selectedLayers;
  }

  selectionClear() {
    this.selection.clear();
  }

  selectionSet(layers) {
    if (_.isArray(layers)) {
      _.forEach(layers, l => (l.selected = true));
    } else {
      layers.selected = true;
    }
  }

  // native
  get context() {
    return NSDocumentController.sharedDocumentController();
  }

  get nativeDocument() {
    return this.context.currentDocument();
  }

  get nativePage() {
    return this.nativeDocument.currentPage();
  }

  // utils

  setGroup(group, layers) {
    _.forEach(layers, l => {
      l.frame = l.frame.changeBasis({ from: l.parent, to: group });
      l.parent = group;
    });
  }

  resizeGroup(group) {
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    const Layers = group.layers;
    _.forEach(Layers, l => {
      const size = l.frame.changeBasis({ from: group, to: group.parent });
      if (size.x < minX) minX = size.x;
      if (size.y < minY) minY = size.y;
      if (size.x + size.width > maxX) maxX = size.x + size.width;
      if (size.y + size.height > maxY) maxY = size.y + size.height;
      l.frame = l.frame.changeBasis({ from: group, to: this.page });
      l.parent = this.page;
    });
    group.frame.x = minX;
    group.frame.y = minY;
    group.frame.width = maxX - minX;
    group.frame.height = maxY - minY;
    _.forEach(Layers, l => {
      l.frame = l.frame.changeBasis({ from: this.page, to: group });
      l.parent = group;
    });
  }

  setById(instance, id, value) {
    const result = _.filter(instance.overrides, o => o.id === id);
    if (result.length === 0) return this.ui.message(`请检查Override-${instance.name}`);
    instance.setOverrideValue(result[0], value);
  }

  setByValue(instance, defaultValue, value) {
    const result = _.filter(instance.overrides, o => o.value === defaultValue);
    if (result.length === 0) return this.ui.message(`请检查Override-${instance.name}`);
    instance.setOverrideValue(result[0], value);
  }

  sortOrder(page = this.page) {
    const GroupTop = this.layer.deepGet(page, '@置顶');
    const GroupLine = this.layer.deepGet(page, '@交互连线');
    const GroupTitle = this.layer.deepGet(page, '@画板标题');
    const GroupShadow = this.layer.deepGet(page, '@画板投影');
    const GorupBottom = this.layer.deepGet(page, '@置底');
    const GroupBg = this.layer.deepGet(page, '@制版');
    // Front
    if (GroupTitle) _.forEach(GroupTitle, l => l.moveToFront());
    if (GroupLine) _.forEach(GroupLine, l => l.moveToFront());
    if (GroupTop) _.forEach(GroupTop, l => l.moveToFront());
    // Back
    if (GroupShadow) _.forEach(GroupShadow, l => l.moveToBack());
    if (GorupBottom) _.forEach(GorupBottom, l => l.moveToBack());
    if (GroupBg) _.forEach(GroupBg, l => l.moveToBack());
  }

  // run

  run() {}

  start(...props) {
    try {
      console.log('[Start]', this.namespace);
      this.run(...props);
      console.log('[End]', this.namespace);
    } catch (e) {
      console.log('[Error]', this.namespace, e);
      this.ui.alert(`Error-${this.namespace}`, String(e));
    }
  }
}
