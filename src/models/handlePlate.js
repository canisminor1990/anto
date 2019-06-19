import _ from 'lodash';
import Sketch from '../sketch';
import moment from 'moment';

const GroupName = '@制版';
const SubGroupName = '@画板投影';

export default class handlePlate extends Sketch {
  constructor() {
    super();
    this.namespace = '制版|handlePlate';
    this.padding = 400;
  }

  run() {
    const isInteractiveMode = this.mode === '交互';
    // 找到Symbol
    const master = this.library.getSymbol(this.library.antoExport, `${this.mode} / 画板`);
    if (!master) return this.ui.warn('请检查Symbol是否存在');
    const symbolMaster = master.import();

    // 清旧图层组
    this.layer.deepRemove(this.page, GroupName);
    this.layer.deepRemove(this.page, SubGroupName);

    // 框选画板>1个时只制版框选部分
    let Layers;
    if (_.filter(this.selection.layers, l => l.type && l.type === 'Artboard').length > 1) {
      Layers = this.selection;
    } else {
      Layers = _.filter(this.page.layers, layer => layer.name[0] !== '@');
    }
    if (Layers.length === 0) return this.ui.warn('找不到可用画板');

    // 遍历
    let x = Infinity;
    let y = Infinity;
    let x2 = -Infinity;
    let y2 = -Infinity;

    let ShadowGroup;
    if (isInteractiveMode)
      ShadowGroup = this.create.group({
        name: SubGroupName,
        parent: this.page,
        locked: true,
      });

    Layers.forEach(l => {
      const rect = l.frame;
      if (rect.x < x) x = rect.x;
      if (rect.y < y) y = rect.y;
      if (rect.x + rect.width > x2) x2 = rect.x + rect.width;
      if (rect.y + rect.height > y2) y2 = rect.y + rect.height;
      // 画投影
      if (isInteractiveMode && l.type === 'Artboard') {
        const Shadow = this.create.shape({
          name: l.name,
          frame: l.frame,
          style: {
            fills: [
              {
                color: '#ffffff',
                fill: 'Color',
              },
            ],
            borders: [],
            shadows: [
              {
                color: '#00000022',
                y: 40,
                blur: 100,
                spread: -20,
              },
            ],
          },
        });
        this.changeBasis(Shadow, { from: this.page, to: ShadowGroup });
        Shadow.parent = ShadowGroup;
      }
    });

    // 制版
    const instance = symbolMaster.createNewInstance();
    instance.frame.x = x - this.padding;
    instance.frame.y = y - this.padding * 2.1;
    instance.frame.width = x2 - x + 2 * this.padding;
    instance.frame.height = y2 - y + 3.7 * this.padding;
    instance.parent = this.page;
    instance.locked = true;

    // 设置override-title
    const author = this.setting.get('config-name');
    if (author && author.length > 0) this.setByValue(instance, '花名', author);
    const title = this.page.name + ` (${this.mode})`;
    this.setByValue(instance, '标题', title);
    this.setByValue(instance, '日期', moment().format('YYYY-MM-DD'));
    const Group = this.create.group({
      name: GroupName,
      parent: this.page,
      locked: true,
    });

    this.changeBasis(instance, { from: this.page, to: Group });
    instance.parent = Group;

    // 原生切片
    const sliceLayer = this.create.slice({
      name: [title, moment().format('MMDD')].join(' '),
      frame: instance.frame,
      parent: Group,
      exportFormats: [{ size: isInteractiveMode ? '0.5x' : '1x' }],
    });
    this.selectionClear();
    sliceLayer.selected = true;
    this.sortOrder();
    this.ui.success('制版成功');
  }
}
