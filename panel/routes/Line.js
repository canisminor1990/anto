import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Line extends Component {
  render() {
    return [
      <Title key="title">线</Title>,
      <View key="panel">
        <Iconfont
          key="连线"
          title="连线"
          type="line-link"
          onClick={() => window.postMessage('handleLine', null)}
        />
        <Iconfont
          key="变向"
          title="变向"
          type="line-change"
          onClick={() => window.postMessage('handleChange', null)}
        />
        <Iconfont
          key="虚实"
          title="虚实"
          type="line-dash"
          onClick={() => window.postMessage('handleDash', null)}
        />
        <Iconfont
          key="说明"
          title="说明"
          type="line-note"
          onClick={() => window.postMessage('setRound', null)}
        />
        <Iconfont
          key="判断"
          title="判断"
          type="line-if"
          onClick={() => window.postMessage('setIf', null)}
        />
        <Close name="line" single />
      </View>,
    ];
  }
}

export default Line;
