import sketch from 'sketch/dom';
import _ from 'lodash';

const Library = sketch.Library;

const remoteLibrary = [
  'anto-ui.xml', // Anto 视觉组件
  'anto-ux.xml', // Anto 交互组件
  'anto-export.xml', // Anto 输出组件
];

export const addLibrary = context => {
  _.forEach(remoteLibrary, fileName => {
    const url = `https://raw.githubusercontent.com/canisminor1990/anto-cloud/master/${fileName}`;
    Library.getRemoteLibraryWithRSS(url, err => {});
  });
};
