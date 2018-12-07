import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import moment from 'moment';
import _ from 'lodash';
import { find, setByValue } from './utils';

export default type => {
  console.log('[Start]', 'handleNote');

  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;
  const mode = Settings.settingForKey('panel-mode');

  if (selection.isEmpty) return UI.message('请选择文本');

  const texts = _.filter(selection.layers, l => l.type === 'Text' || l.type === 'SymbolInstance');
  if (texts.length === 0) return UI.message('请选择文本');

  // 找到Library
  const libraries = sketch.Library.getLibraries();
  const library = find(libraries, 'name', 'AFUX 输出组件');
  if (!library) return UI.message('请检查Library是否存在');

  // 找到Symbol
  const Name = {
    header: {
      name: `${mode} / 标题-链路`,
    },
    subheader: {
      name: `${mode} / 标题-小标题`,
    },
    block: {
      name: `${mode} / 注释-块`,
    },
    list: {
      name: `${mode} / 注释-列`,
    },
    ul: {
      name: `${mode} / 描述-列表`,
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
      name: `${mode} / 描述-变更记录`,
      replace2: '日期',
    },
  };

  let master;
  if (type !== 'text') {
    const symbolReferences = library.getImportableSymbolReferencesForDocument(document);
    master = find(symbolReferences, 'name', Name[type].name);
    if (!master) return UI.message('请检查Symbol是否存在');
  }
  selection.clear();
  _.forEach(texts, text => {
    if (!text.type) return UI.message('请选择文本');
    if (type === 'text') {
      const style = {
        opacity: 1,
        borders: [],
        shadows: [],
        fills: [
          {
            color: mode === '交互' ? '#333' : '#ffffff',
            fill: sketch.Style.FillType.Color,
          },
        ],
      };
      if (text.type === 'Text') {
        text.systemFontSize = 32;
        text.frame.width = 750;
        text.style = style;
        text.selected = true;
      } else {
        const newText = new sketch.Text({
          name: text.name,
          frame: text.frame,
          parent: text.parent,
          systemFontSize: 32,
          selected: true,
        });
        _.forEach(text.overrides, o => {
          if (!o.isDefault && o.property === 'stringValue') newText.value = o.value;
        });
        newText.style = style;
        text.remove();
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
        setByValue(instance, '文字', text.text);
      } else {
        _.forEach(text.overrides, o => {
          if (!o.isDefault && o.property === 'stringValue') setByValue(instance, '文字', o.value);
        });
      }
      if (type === 'changelog')
        setByValue(instance, Name.changelog.replace, moment().format('MMDD'));

      text.remove();
    }
  });
  UI.message('生成成功');
};
