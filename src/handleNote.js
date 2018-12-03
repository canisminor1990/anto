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

  const texts = _.filter(selection.layers, l => l.type === 'Text');
  if (texts.length === 0) return UI.message('请选择文本');

  // 找到Library
  const libraries = sketch.Library.getLibraries();
  const library = find(libraries, 'name', 'AFUX 输出组件');
  if (!library) return UI.message('请检查Library是否存在');

  // 找到Symbol
  const Name = {
    header: {
      name: `${mode} / 标题-链路`,
      replace: '标题',
    },
    block: {
      name: `${mode} / 注释-块`,
      replace: '注释',
    },
    list: {
      name: `${mode} / 注释-列`,
      replace: '注释',
    },
    ul: {
      name: `${mode} / 描述-列表`,
      replace: '注释',
    },
    point: {
      name: `交互 / 节点-矩形`,
      replace: '标题',
    },
    round: {
      name: `交互 / 节点-胶囊`,
      replace: '标题',
    },
    if: {
      name: `交互 / 节点-判断`,
      replace: '标题',
    },
    changelog: {
      name: `${mode} / 描述-变更记录`,
      replace: '注释',
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
    if (type === 'text') {
      text.systemFontSize = 32;
      text.frame.width = 750;
      text.style = {
        opacity: 1,
        borders: [],
        shadows: [],
        fills: [
          {
            color: mode === '交互' ? '#2B79FF' : '#ffffff',
            fill: sketch.Style.FillType.Color,
          },
        ],
      };
    } else {
      const symbolMaster = master.import();
      const instance = symbolMaster.createNewInstance();

      instance.name = text.name;
      instance.parent = text.parent;
      instance.frame.x = text.frame.x;
      instance.frame.y = text.frame.y;
      instance.selected = true;
      // 设置override
      setByValue(instance, Name[type].replace, text.text);
      if (type === 'changelog') {
        setByValue(instance, Name.changelog.replace2, moment().format('MMDD'));
      }
      text.remove();
    }
  });
};
