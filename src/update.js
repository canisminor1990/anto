import compareVersions from 'compare-versions';
import Sk from './sketch';

const Sketch = new Sk();

export const update = context => {
  fetch('https://api.github.com/repos/canisminor1990/anto/releases/latest')
    .then(res => res.json())
    .then(json => {
      const { name, assets } = json;
      const result = compareVersions(name, String(context.plugin.version()));
      if (result === 1) {
        const url = assets[0].browser_download_url;
        const ok = Sketch.ui.selectPanel(`发现最新版本 🔵 Anto，是否立即更新？`, [name]);
        if (ok) Sketch.openUrl(url);
      }
    });
};
