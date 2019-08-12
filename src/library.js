import sketch from 'sketch/dom';
import _ from 'lodash';

const Library = sketch.Library;

const remoteLibrary = [
  'anto-ui.xml', // Anto 视觉组件
  'anto-ux.xml', // Anto 交互组件
  'anto-export.xml', // Anto 输出组件
];

const libName = [
  'Anto UI', // Anto 视觉组件
  'Anto UX', // Anto 交互组件
  'Anto Export', // Anto 输出组件
];

export const addLibrary = context => {
  _.forEach(Library.getLibraries(), lib => {
    if (_.includes(libName, lib.name)) lib.remove();
  });

  _.forEach(remoteLibrary, fileName => {
    const url = `http://100.88.232.163/library/${fileName}`;
    Library.getRemoteLibraryWithRSS(url, err => {});
  });
};
