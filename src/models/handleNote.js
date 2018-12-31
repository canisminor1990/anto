import _ from 'lodash';
import Sketch from '../sketch';
import moment from 'moment';

export default class handleNote extends Sketch {
  constructor() {
    super();
    this.namespace = '标注|handleNote';
    this.option = {
      header: {
        name: `${this.mode} / 标题-链路`,
      },
      subheader: {
        name: `${this.mode} / 标题-小标题`,
      },
      block: {
        name: `${this.mode} / 注释-块`,
      },
      list: {
        name: `${this.mode} / 注释-列`,
      },
      ul: {
        name: `${this.mode} / 描述-列表`,
      },
      point: {
        name: `交互 / 节点-矩形`,
      },
      round: {
        name: `交互 / 节点-胶囊`,
      },
      if: {
        name: `交互 / 节点-判断`,
      },
      changelog: {
        name: `${this.mode} / 描述-变更记录`,
        replace: '日期',
      },
    };
  }

  run(type) {
    const isText = type === 'text';
    if (this.selection.isEmpty) return this.ui.warn('请选择文本');
    const texts = _.filter(
      this.selection.layers,
      l => l.type === 'Text' || l.type === 'SymbolInstance'
    );
    if (texts.length === 0) return this.ui.warn('请选择文本');

    // 找到Symbol
    let master;
    if (!isText) {
      master = this.library.getSymbol(this.library.afuxExport, this.option[type].name);
      if (!master) return this.ui.warn('请检查Symbol是否存在');
    }

    this.selectionClear();

    _.forEach(texts, text => {
      if (!text.type) return this.ui.warn('请选择文本');
      if (isText) {
        if (text.type === 'Text') {
          this.setStyle(text);
        } else {
          const newText = this.create.text({
            name: text.name,
            frame: text.frame,
            parent: text.parent,
          });
          this.setStyle(newText);
          try {
            const value = _.filter(
              text.overrides,
              o => !o.isDefault && o.property === 'stringValue'
            )[0].value;
            newText.text = value;
            text.remove();
          } catch (e) {}
        }
      } else {
        const symbolMaster = master.import();
        const instance = symbolMaster.createNewInstance();
        instance.name = text.name;
        instance.parent = text.parent;
        instance.frame.x = text.frame.x;
        instance.frame.y = text.frame.y;
        instance.selected = true;

        // 设置override
        if (text.type === 'Text') {
          this.setByValue(instance, '文字', text.text);
        } else {
          _.forEach(text.overrides, o => {
            if (!o.isDefault && o.property === 'stringValue')
              this.setByValue(instance, '文字', o.value);
          });
        }
        if (type === 'changelog')
          this.setByValue(instance, this.option.changelog.replace, moment().format('MMDD'));
        text.remove();
      }
    });

    this.ui.success('标注成功');
  }

  setStyle(layer) {
    layer.systemFontSize = 32;
    layer.frame.width = 750;
    layer.alignment = 'justify';
    layer.selected = true;
    layer.style = {
      opacity: 1,
      borders: [],
      shadows: [],
      fills: [
        {
          color: this.mode === '交互' ? '#333' : '#ffffff',
          fill: 'Color',
        },
      ],
    };
  }
}
