import _ from 'lodash';
import Sketch from '../sketch';

class handleFrontBack extends Sketch {
  constructor() {
    super();
    this.namespace = '置顶置底|handleFrontBack';
  }

  run(name) {
    const GroupName = `@${name}`;
    const Groups = this.layer.get(this.page, GroupName);
    const Group =
      Groups[0] ||
      this.create.group({
        name: GroupName,
        parent: this.page,
      });

    const layers = _.filter(
      this.selection.layers,
      l => l.type && l.type !== 'Page' && l.type !== 'Artboard'
    );
    if (layers.length === 0) return this.ui.warn(`请选择需要${name}的图层`);
    this.setGroup(Group, layers);
    Group.locked = true;
    this.sortOrder();
    this.ui.success(`所选图层已${name}`);
  }
}

export default new handleFrontBack();
