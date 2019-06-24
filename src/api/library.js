import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';

export default class SketchLibrary {
  get all() {
    return sketch.Library.getLibraries();
  }

  get antoExport() {
    return this.get('Anto Export');
  }

  get ux() {
    return this.get('Anto UX');
  }

  get ui() {
    return this.get('Anto UI');
  }

  get(name) {
    const result = _.filter(this.all, lib => lib.name === name);
    if (result.length > 0) return result[0];
    UI.message(`😥 请检查「${name}」是否存在`);
    return false;
  }
  getSymbols(library) {
    return library.getImportableSymbolReferencesForDocument(sketch.getSelectedDocument());
  }
  getSymbol(library, name) {
    const librarySymbols = this.getSymbols(library);
    const result = _.filter(librarySymbols, s => s.name === name);
    return result.length > 0 ? result[0] : false;
  }
}
