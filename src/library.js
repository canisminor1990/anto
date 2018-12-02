import sketch from 'sketch/dom';

export const addLibrary = context => {
  const Library = sketch.Library;
  const libraryFiles = ['AFUX 输出组件.sketch'];
  libraryFiles.forEach(fileName => {
    const libraryUrl = context.plugin.urlForResourceNamed(fileName);
    if (libraryUrl) {
      const libraryPath = String(libraryUrl.path());
      const library = Library.getLibraryForDocumentAtPath(libraryPath);
      AppController.sharedInstance().checkForAssetLibraryUpdates();
      if (context.action === 'Shutdown') {
        library.remove();
      }
    }
  });
};
