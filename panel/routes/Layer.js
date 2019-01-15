import { Component } from 'react';
import { Icon, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return [
      <Title key="title">层</Title>,
      <View key="panel">
        <Icon
          key="对齐"
          title="对齐"
          type="icon-layout"
          onClick={() => window.postMessage('handleLayout', null)}
        />
        <Icon
          key="排序"
          title="排序"
          type="icon-sort"
          onClick={() => window.postMessage('handleSort', null)}
        />
        <Icon
          key="置顶"
          title="置顶"
          type="icon-top"
          onClick={() => window.postMessage('handleTop', null)}
        />
        <Icon
          key="置底"
          title="置底"
          type="icon-bottom"
          onClick={() => window.postMessage('handleBottom', null)}
        />
        <Icon
          key="调高"
          title="调高"
          type="icon-height"
          onClick={() => window.postMessage('handleHeight', null)}
        />
        <Close name="layer" single />
      </View>,
    ];
  }
}

export default Layer;
