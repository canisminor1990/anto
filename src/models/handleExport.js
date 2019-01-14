import _ from 'lodash';
import Sketch from '../sketch';
import moment from 'moment';
import { join } from 'path';
import preivew from '../preview.json';
import fs from '@skpm/fs';
import dialog from '@skpm/dialog';
import jsZip from 'jszip';

export default class handleExport extends Sketch {
  constructor() {
    super();
    this.namespace = '导出|handleExport';
    this.height = 400;
  }

  run() {
    const zip = new jsZip();
    const Data = {
      date: moment().format('YYYY-MM-DD'),
      author: this.setting.get('config-name'),
      pages: [],
    };

    // 获取路径
    const RootPath = dialog.showSaveDialog({
      title: 'Export Zip to',
      defaultPath: [this.fileName, moment().format('MMDD')].join(' '),
    });

    if (_.isUndefined(RootPath)) return;

    _.forEach(this.native.pages, page => {
      _.forEach(page.layers(), layer => {
        if (String(layer.name()) === '@制版') {
          const sliceLayer = _.filter(layer.layers(), l => String(l.class()) === 'MSSliceLayer')[0];
          const name = String(sliceLayer.name());
          const info = name.split(' (')[1].split(') ');
          const path = join('preview', name + '.png');
          Data.pages.push({
            path: path,
            name: String(page.name()),
            mode: info[0],
            date: info[1],
            width: sliceLayer.frame().width(),
            height: sliceLayer.frame().height() - this.height,
          });
          this.native.setY(sliceLayer, sliceLayer.frame().y() + this.height);
          this.native.setHeight(sliceLayer, sliceLayer.frame().height() - this.height);

          // 导出切图
          this.native.exportSlice(sliceLayer, join(RootPath, 'preview'));
          this.native.setY(sliceLayer, sliceLayer.frame().y() - this.height);
          this.native.setHeight(sliceLayer, sliceLayer.frame().height() + this.height);
          zip.file(path, fs.readFileSync(join(RootPath, path)));
        }
      });
    });

    // 导出文件
    zip.file('data.js', ` localStorage.setItem('preview', '${JSON.stringify(Data)}');`);
    zip.file('index.css', preivew.css);
    zip.file('index.html', preivew.html);
    zip.file('index.js', preivew.js);

    // 删除缓存图片
    fs.unlinkSync(RootPath);

    // 创建压缩包
    this.ui.message(`⏲ 开始生产压缩文件，请稍后...`);
    zip.generateAsync({ type: 'base64' }).then(data => {
      const file = Buffer.from(data, 'base64');
      const filePath = RootPath + '.zip';
      fs.writeFileSync(filePath, file);
      this.ui.alert('✅ 导出成功', `导出至：${filePath}`);
      this.openPath(join(filePath, '..'));
    });
  }
}
