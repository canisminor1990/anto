import QueueAnim from 'rc-queue-anim';
import { Component } from 'react';
import { Icon, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return [
      <Title key="title">板</Title>,
      <View key="panel">
        <Icon
          key="排除"
          title="排除"
          type="icon-ignore"
          onClick={() => window.postMessage('handleIgnore', null)}
        />
        <Icon
          key="制标"
          title="制标"
          type="icon-title"
          onClick={() => window.postMessage('handleTitle', null)}
        />
        <Icon
          key="制版"
          title="制版"
          type="icon-plate"
          onClick={() => window.postMessage('handlePlate', null)}
        />
        <Icon
          key="导出"
          title="导出"
          type="icon-export"
          onClick={() => window.postMessage('handleExport', null)}
        />
        <Close name="layer" single />
      </View>,
    ];
  }
}

export default Layer;
