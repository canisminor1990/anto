import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import { join } from 'path';

let sliceLayer;

export default () => {
  console.log('[Start]', 'handleExport');
  const app = NSDocumentController.sharedDocumentController();
  const nativeDocument = app.currentDocument();
  const nativePage = nativeDocument.currentPage();

  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;

  nativePage.layers().forEach(l => {
    if (String(l.name()) === '@制版') {
      l.addLayers([sliceLayer]);
      sliceLayer.select_byExtendingSelection(true, true);
    }
  });

  // 获取路径
  const RootPath = getPath(nativeDocument);

  // 导出切图
  exportSlice(nativeDocument, sliceLayer, RootPath);

  // 导出文件
  const Data = { test: 111 };
  writeFile(Data, RootPath, '1.json');
  UI.message(`✅ 导出至：${RootPath}`);
};

function getPath(nativeDocument) {
  const filePath = nativeDocument.fileURL()
    ? nativeDocument
        .fileURL()
        .path()
        .stringByDeletingLastPathComponent()
    : '~';
  const fileName = nativeDocument.displayName().stringByDeletingPathExtension();
  const savePanel = NSSavePanel.savePanel();
  savePanel.setTitle('Export spec');
  savePanel.setNameFieldLabel('Export to:');
  savePanel.setPrompt('Export');
  savePanel.setCanCreateDirectories(true);
  savePanel.setNameFieldStringValue(fileName);
  return String(savePanel.URL().path());
}

function exportSlice(nativeDocument, slice, path) {
  nativeDocument.saveArtboardOrSlice_toFile(slice, join(path, String(slice.name()) + '.png'));
}

function writeFile(data, path, name) {
  const content = NSString.stringWithString(JSON.stringify(data));
  content.writeToFile_atomically_encoding_error(join(path, name), false, 4, null);
}
