import Settings from 'sketch/settings';

export default class SketchSetting {
  get(key) {
    return Settings.settingForKey(key);
  }

  set(key, value) {
    return Settings.setSettingForKey(key, value);
  }

  getLayer(layer, key) {
    return Settings.layerSettingForKey(layer, key);
  }

  setLayer(layer, key, value) {
    return Settings.setLayerSettingForKey(layer, key, value);
  }

  getDocument(document, key) {
    return Settings.documentSettingForKey(document, key);
  }

  setDocument(document, key, value) {
    return Settings.setDocumentSettingForKey(document, key, value);
  }
}
