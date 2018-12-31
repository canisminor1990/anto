import _ from 'lodash';
import Sketch from '../sketch';
import moment from 'moment';
import { join } from 'path';
import preivew from '../preview.json';

export default class handleExport extends Sketch {
  constructor() {
    super();
    this.namespace = '导出|handleExport';
    this.height = 400;
  }

  run() {
    const Data = {
      date: moment().format('YYYY-MM-DD'),
      author: this.setting.get('config-name'),
      pages: [],
    };

    // 获取路径
    const RootPath = this.getPath();

    _.forEach(this.native.pages, page => {
      _.forEach(page.layers(), layer => {
        if (String(layer.name()) === '@制版') {
          const sliceLayer = _.filter(layer.layers(), l => String(l.class()) === 'MSSliceLayer')[0];
          const name = String(sliceLayer.name());
          const info = name.split(' (')[1].split(') ');
          Data.pages.push({
            path: join('preview', String(sliceLayer.name()) + '.png'),
            name: String(page.name()),
            mode: info[0],
            date: info[1],
            width: sliceLayer.frame().width(),
            height: sliceLayer.frame().height() - this.height,
          });
          this.native.setY(sliceLayer, sliceLayer.frame().y() + this.height);
          this.native.setHeight(sliceLayer, sliceLayer.frame().height() - this.height);

          // 导出切图
          this.exportSlice(sliceLayer, RootPath);
          this.native.setY(sliceLayer, sliceLayer.frame().y() - this.height);
          this.native.setHeight(sliceLayer, sliceLayer.frame().height() + this.height);
        }
      });
    });

    // 导出文件
    this.writeFile(
      ` localStorage.setItem('preview', '${JSON.stringify(Data)}');`,
      RootPath,
      'data.js'
    );
    this.writeFile(preivew.css, RootPath, 'index.css');
    this.writeFile(preivew.html, RootPath, 'index.html');
    this.writeFile(preivew.js, RootPath, 'index.js');
    this.ui.success(`导出至：${RootPath}`);
  }

  getPath() {
    const filePath = this.native.document.fileURL()
      ? this.native.document
          .fileURL()
          .path()
          .stringByDeletingLastPathComponent()
      : '~';

    const fileName = this.native.document.displayName().stringByDeletingPathExtension();
    return join(String(filePath), String(fileName));
  }

  exportSlice(slice, path) {
    this.native.document.saveArtboardOrSlice_toFile(
      slice,
      join(path, 'preview', String(slice.name()) + '.png')
    );
  }

  writeFile(data, path, name) {
    const content = NSString.stringWithString(data);
    content.writeToFile_atomically_encoding_error(join(path, name), false, 4, null);
  }
}
