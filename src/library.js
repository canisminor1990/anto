import sketch from 'sketch/dom';
import { join } from 'path';
import _ from 'lodash';
import { find } from './utils';
import path from '@skpm/path';

const libraryFiles = ['AFUX 输出组件.sketch', 'AFUX 交互组件.sketch'];

export const removeLibrary = () => {
  const Librarys = sketch.Library.getLibraries();
  _.forEach(libraryFiles, fileName => {
    const Library = find(Librarys, 'name', fileName);
    Library.remove();
  });
};

export const addLibrary = context => {
  console.log(1, path.resourcePath('sketch'));
  const Library = sketch.Library;
  _.forEach(libraryFiles, fileName => {
    const libraryUrl = context.plugin.urlForResourceNamed(join('sketch', fileName));
    if (libraryUrl) {
      const libraryPath = String(libraryUrl.path());
      Library.getLibraryForDocumentAtPath(libraryPath);
      AppController.sharedInstance().checkForAssetLibraryUpdates();
    }
  });
};
