import _ from 'lodash';
import Sketch from '../sketch';

export default class handleLocalSymbol extends Sketch {
  constructor() {
    super();
    this.namespace = '本地组件|handleLocalSymbol';
  }

  run(id) {
    console.log(id);
  }
}
