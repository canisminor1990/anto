import UI from 'sketch/ui';

export default class sketchUI {
  message(string) {
    console.log(string);
    UI.message(string);
  }

  success(string) {
    this.message(`🔵 ${string}`);
  }
  warn(string) {
    this.message(`😥 ${string}`);
  }
  error(string) {
    this.message(`🥵 ${string}`);
  }
  alert(title, string) {
    UI.alert(title, string);
  }
  inputPanel(title, defalutValue, func) {
    return UI.getInputFromUser(title, defalutValue, func);
  }
  selectPanel(title, options = []) {
    const selection = UI.getSelectionFromUser(title, options);
    const ok = selection[2];
    const value = options[selection[1]];
    return ok ? value : false;
  }
}
