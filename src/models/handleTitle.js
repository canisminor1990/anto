import _ from 'lodash';
import Sketch from '../sketch';

const GroupName = '@画板标题';

export default class handleTitle extends Sketch {
  constructor() {
    super();
    this.namespace = '制标|handleTitle';
  }

  run() {
    const Artboards = _.filter(
      this.artboards,
      layer => layer.name[0] !== '@' && layer.frame.width >= 750 / 3 && layer.frame.width <= 750 * 3
    );
    if (Artboards.length === 0) return this.ui.warn('找不到可用画板');

    // 找到Symbol
    let symbolName;
    if (this.mode === '视觉') {
      symbolName = '视觉 / 标题';
    } else {
      const titleStyle = this.setting.get('config-title');
      symbolName = titleStyle === 'strong' ? '交互 / 标题-强' : '交互 / 标题';
    }

    const master = this.library.getSymbol(this.library.afuxExport, symbolName);
    if (!master) return this.ui.warn('请检查Symbol是否存在');

    // 导入
    this.layer.deepRemove(this.page, GroupName);
    const Group = this.create.group({
      name: GroupName,
      parent: this.page,
    });
    const symbolMaster = master.import();

    // 生成
    _.forEach(Artboards, Artboard => {
      const instance = symbolMaster.createNewInstance();
      instance.parent = Group;
      instance.frame.x = Artboard.frame.x;
      instance.frame.y = Artboard.frame.y - 150;
      instance.frame.width = Artboard.frame.width;
      this.changeBasis(instance, { from: this.page, to: Group });
      // 设置override
      const titleId = '标题';
      this.setByValue(instance, titleId, Artboard.name);
    });

    // 锁定
    Group.locked = true;
    this.sortOrder();
    this.ui.success('制标成功');
  }
}
