import QueueAnim from 'rc-queue-anim';
import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return [
      <Title key="title">板</Title>,
      <View key="panel">
        <Iconfont
          key="排除"
          title="排除"
          type="plate-ignore"
          onClick={() => window.postMessage('handleIgnore', null)}
        />
        <Iconfont
          key="制标"
          title="制标"
          type="plate-title"
          onClick={() => window.postMessage('handleTitle', null)}
        />
        <Iconfont
          key="制版"
          title="制版"
          type="plate-artboard"
          onClick={() => window.postMessage('handlePlate', null)}
        />
        <Iconfont
          key="导出"
          title="导出"
          type="plate-export"
          onClick={() => window.postMessage('handleExport', null)}
        />
        <Close name="layer" single />
      </View>,
    ];
  }
}

export default Layer;
