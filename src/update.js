import compareVersions from 'compare-versions';
import UI from 'sketch/ui';

export const update = context => {
  fetch('https://api.github.com/repos/canisminor1990/anto/releases/latest')
    .then(res => res.json())
    .then(json => {
      const { name, assets } = json;
      const result = compareVersions(name, String(context.plugin.version()));
      if (result === 1) {
        const url = assets[0].browser_download_url;
        const ok = selectPanel(`发现最新版本 🔵 Anto，是否立即更新？`, [name]);
        if (ok) {
          NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
        }
      }
    });
};

function selectPanel(title, options = []) {
  const selection = UI.getSelectionFromUser(title, options);
  const ok = selection[2];
  const value = options[selection[1]];
  return ok ? value : false;
}
