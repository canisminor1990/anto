import sketch from 'sketch/dom';
import _ from 'lodash';

const Library = sketch.Library;

export const addLibrary = context => {
  fetch('http://100.88.232.163/static/tabs.json')
    .then(res => res.json())
    .then(json => {
      let remoteLibrary = ['anto-export.xml'];
      let libName = ['Anto Export'];
      _.forEach(json, lib => {
        remoteLibrary.push(lib.filename + '.xml');
        libName.push(lib.libname);
      });
      _.forEach(remoteLibrary, fileName => {
        const url = `http://100.88.232.163/library/${fileName}`;
        Library.getRemoteLibraryWithRSS(url, err => {
          console.log(err);
        });
      });
    });
};

export const cleanLibrary = context => {
  fetch('http://100.88.232.163/static/tabs.json')
    .then(res => res.json())
    .then(json => {
      let remoteLibrary = ['anto-export.xml'];
      let libName = ['Anto Export'];
      _.forEach(json, lib => {
        remoteLibrary.push(lib.filename + '.xml');
        libName.push(lib.libname);
      });

      _.forEach(Library.getLibraries(), lib => {
        if (_.includes(libName, lib.name)) lib.remove();
      });

      _.forEach(remoteLibrary, fileName => {
        const url = `http://100.88.232.163/library/${fileName}`;
        Library.getRemoteLibraryWithRSS(url, err => {
          console.log(err);
        });
      });
    });
};
