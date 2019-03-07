import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';
import { PostMessage } from '../utils/PostMessage';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return (
      <>
        <Title key="title">板</Title>
        <View key="panel">
          <Iconfont
            key="排除"
            title="排除"
            type="plate-ignore"
            onClick={() => PostMessage('handleIgnore', null)}
          />
          <Iconfont
            key="序号"
            title="序号"
            type="plate-number"
            onClick={() => PostMessage('handleNumber', null)}
          />
          <Iconfont
            key="制标"
            title="制标"
            type="plate-title"
            onClick={() => PostMessage('handleTitle', null)}
          />
          <Iconfont
            key="制版"
            title="制版"
            type="plate-artboard"
            onClick={() => PostMessage('handlePlate', null)}
          />
          <Iconfont
            key="导出"
            title="导出"
            type="plate-export"
            onClick={() => PostMessage('handleExport', null)}
          />
          <Close name="layer" single />
        </View>
      </>
    );
  }
}

export default Layer;
