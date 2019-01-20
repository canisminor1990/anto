import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return [
      <Title key="title">层</Title>,
      <View key="panel">
        <Iconfont
          key="对齐"
          title="对齐"
          type="layer-layout"
          onClick={() => window.postMessage('handleLayout', null)}
        />
        <Iconfont
          key="排序"
          title="排序"
          type="layer-sort"
          onClick={() => window.postMessage('handleSort', null)}
        />
        <Iconfont
          key="置顶"
          title="置顶"
          type="layer-top-lite"
          onClick={() => window.postMessage('handleTopLite', null)}
        />
        <Iconfont
          key="置底"
          title="置底"
          type="layer-bottom-lite"
          onClick={() => window.postMessage('handleBottomLite', null)}
        />
        <Iconfont
          key="大置顶"
          title="大置顶"
          type="layer-top"
          onClick={() => window.postMessage('handleTop', null)}
        />
        <Iconfont
          key="大置底"
          title="大置底"
          type="layer-bottom"
          onClick={() => window.postMessage('handleBottom', null)}
        />
        <Iconfont
          key="调高"
          title="调高"
          type="layer-height"
          onClick={() => window.postMessage('handleHeight', null)}
        />
        <Close name="layer" single />
      </View>,
    ];
  }
}

export default Layer;
